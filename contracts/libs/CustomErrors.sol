// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface CustomErrors {

    error OptionExpiryInvalid();    
	error NotKeeper();
	error IVNotFound();
	error NotHandler();
	error NotUpdater();
	error VaultExpired();
	error InvalidInput();
	error InvalidPrice();
	error InvalidBuyer();
	error InvalidOrder();
	error OrderExpired();
	error InvalidExpiry();
	error InvalidAmount();
	error TradingPaused();
	error InvalidAddress();
	error IssuanceFailed();
	error EpochNotClosed();
	error NoPositionsOpen();
	error InvalidDecimals();
	error InActivePosition();
	error NoActivePosition();
	error TradingNotPaused();
	error NotLiquidityPool();
	error UnauthorizedExit();
	error UnapprovedSeries();
	error SeriesNotBuyable();
	error DeltaNotDecreased();
	error NonExistentOtoken();
	error SeriesNotSellable();
	error InvalidGmxCallback();
	error GmxCallbackPending();
	error OrderExpiryTooLong();
	error InvalidShareAmount();
	error ExistingWithdrawal();
	error TotalSupplyReached();
	error StrikeAssetInvalid();
	error InsufficientBalance();
	error OptionStrikeInvalid();
	
}