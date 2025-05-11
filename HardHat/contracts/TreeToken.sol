// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TreeToken is ERC20Pausable, Ownable {
    constructor() ERC20("TreeToken", "TREE") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner {
        _unpause();
    }

    function getBalance(address _address) public view whenNotPaused returns (uint256) {
        return balanceOf(_address);
    }

    function airDrop(address[] memory recipients, uint256 amount) public onlyOwner whenNotPaused {
        require(recipients.length > 0, "No recipients were provided");
        require(recipients.length <= 3, "Just 3 accounts per airdrop");
        for(uint i = 0; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amount);
        }
    }

    function burn(address account, uint256 amount) public onlyOwner whenNotPaused {
        _burn(account, amount);
    }

    function _update(address from, address to, uint256 value) internal override whenNotPaused {
        super._update(from, to, value);
    }

    // para caso se queira mais tokens futuramente
    function mint(uint256 amount) public onlyOwner whenNotPaused {
        _mint(owner(), amount);
    }
}