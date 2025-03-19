// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title TokenBridge
 * @dev A bridge contract for transferring tokens to Huddle01 network
 */
contract TokenBridge is Ownable(msg.sender), ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // Events
    event TokensLocked(
        address indexed token,
        address indexed sender,
        uint256 amount,
        string destinationAddress,
        uint256 nonce,
        uint256 fee
    );

    event BridgeFeeUpdated(uint256 newFee);
    event EmergencyWithdraw(address token, uint256 amount, address recipient);

    // State variables
    uint256 public bridgeFeePercentage = 10; // 0.1% (basis points: 10/10000)
    uint256 private nonce = 0;
    
    // Mapping to keep track of processed transactions
    mapping(bytes32 => bool) public processedTxs;
    
    // Mapping to keep track of registered tokens
    mapping(address => bool) public registeredTokens;

    // Constructor
    constructor() {
        // Initialize contract
    }

    /**
     * @dev Register a token to be bridgeable
     * @param tokenAddress Address of the token to register
     */
    function registerToken(address tokenAddress) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token address");
        require(!registeredTokens[tokenAddress], "Token already registered");
        
        registeredTokens[tokenAddress] = true;
    }

    /**
     * @dev Unregister a token
     * @param tokenAddress Address of the token to unregister
     */
    function unregisterToken(address tokenAddress) external onlyOwner {
        require(registeredTokens[tokenAddress], "Token not registered");
        
        registeredTokens[tokenAddress] = false;
    }

    /**
     * @dev Lock tokens in the bridge to be minted on Huddle01 network
     * @param tokenAddress Address of the token to lock
     * @param amount Amount of tokens to lock
     * @param destinationAddress Address on Huddle01 network to receive the tokens
     */
    function lockTokens(
        address tokenAddress,
        uint256 amount,
        string calldata destinationAddress
    ) external payable nonReentrant whenNotPaused  {
        require(amount > 0, "Amount must be greater than 0");
        require(registeredTokens[tokenAddress], "Token not supported");
        
        // Calculate fee (0.1% of gas fee)
        uint256 gasFee = tx.gasprice * gasleft();
        uint256 fee = (gasFee * bridgeFeePercentage) / 10000;
        
        // User must send ETH to cover the fee
        require(msg.value >= fee, "Insufficient fee");
        
        // Increment nonce for unique transaction IDs
        uint256 currentNonce = nonce++;
        
        // Transfer tokens from user to bridge
        IERC20(tokenAddress).safeTransferFrom(msg.sender, address(this), amount);
        
        // Emit event to be picked up by the backend
        emit TokensLocked(
            tokenAddress,
            msg.sender,
            amount,
            destinationAddress,
            currentNonce,
            fee
        );
        
        // Refund excess fee
        if (msg.value > fee) {
            payable(msg.sender).transfer(msg.value - fee);
        }
    }

    /**
     * @dev Set the bridge fee percentage (in basis points, e.g., 10 = 0.1%)
     * @param newFeePercentage New fee percentage in basis points
     */
    function setBridgeFeePercentage(uint256 newFeePercentage) external onlyOwner {
        require(newFeePercentage <= 1000, "Fee too high"); // Max 10%
        bridgeFeePercentage = newFeePercentage;
        emit BridgeFeeUpdated(newFeePercentage);
    }

    /**
     * @dev Pause the bridge in case of emergency
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause the bridge
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Withdraw fees collected by the bridge
     * @param recipient Address to receive the fees
     */
    function withdrawFees(address payable recipient) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        recipient.transfer(balance);
    }

    /**
     * @dev Emergency withdraw tokens in case they get stuck
     * @param tokenAddress Address of the token to withdraw
     * @param amount Amount to withdraw
     * @param recipient Address to receive the tokens
     */
    function emergencyWithdraw(
        address tokenAddress,
        uint256 amount,
        address recipient
    ) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        
        if (tokenAddress == address(0)) {
            // Withdraw ETH
            payable(recipient).transfer(amount);
        } else {
            // Withdraw ERC20 tokens
            IERC20(tokenAddress).safeTransfer(recipient, amount);
        }
        
        emit EmergencyWithdraw(tokenAddress, amount, recipient);
    }

    // Function to receive ETH
    receive() external payable {}
}
