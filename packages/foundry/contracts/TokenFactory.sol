// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./BridgedToken.sol";

/**
 * @title TokenFactory
 * @dev Factory for creating bridged tokens on Huddle01 network
 */
contract TokenFactory is Ownable(msg.sender), Pausable {
    // Mapping from source chain token address to Huddle01 token address
    mapping(address => address) public sourceToDestToken;
    
    event TokenCreated(
        address indexed sourceToken,
        address indexed destinationToken,
        string name,
        string symbol
    );
    
    /**
     * @dev Create a new bridged token
     * @param name Token name
     * @param symbol Token symbol
     * @param decimals Token decimals
     * @param sourceToken Source chain token address
     */
    function createToken(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        address sourceToken
    ) external onlyOwner whenNotPaused returns (address) {
        require(sourceToDestToken[sourceToken] == address(0), "Token already exists");
        
        BridgedToken token = new BridgedToken(
            name,
            symbol,
            decimals,
            sourceToken,
            owner()  // The owner will be the bridge controller
        );
        
        address tokenAddress = address(token);
        sourceToDestToken[sourceToken] = tokenAddress;
        
        emit TokenCreated(sourceToken, tokenAddress, name, symbol);
        
        return tokenAddress;
    }
    
    /**
     * @dev Get the destination token address for a source token
     * @param sourceToken Source chain token address
     */
    function getDestinationToken(address sourceToken) external view returns (address) {
        return sourceToDestToken[sourceToken];
    }
    
    /**
     * @dev Pause the factory
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the factory
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}