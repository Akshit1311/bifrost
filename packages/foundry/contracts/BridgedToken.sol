// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/**
 * @title BridgedToken
 * @dev A token that can be minted by the bridge on Huddle01 network
 */
contract BridgedToken is ERC20, Ownable, ERC20Burnable {
    address public bridge;
    address public sourceChainToken;
    uint8 private _decimals;

    event BridgeUpdated(address newBridge);
    
    constructor(
        string memory name,
        string memory symbol,
        uint8 tokenDecimals,
        address sourceToken,
        address bridgeAddress
    ) ERC20(name, symbol) Ownable(msg.sender) ERC20Burnable() {
        _decimals = tokenDecimals;
        sourceChainToken = sourceToken;
        bridge = bridgeAddress;
    }
    
    /**
     * @dev Returns the number of decimals used for token
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    /**
     * @dev Mint tokens - can only be called by the bridge
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external {
        require(msg.sender == bridge, "Only bridge can mint");
        _mint(to, amount);
    }
    
    /**
     * @dev Set the bridge address
     * @param newBridge New bridge address
     */
    function setBridge(address newBridge) external onlyOwner {
        require(newBridge != address(0), "Invalid bridge address");
        bridge = newBridge;
        emit BridgeUpdated(newBridge);
    }
}
