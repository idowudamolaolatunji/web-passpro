export function formatNumber(amount, dec=0) {
	return Number(amount)
		.toFixed(dec)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}