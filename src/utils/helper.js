export function formatNumber(amount, dec=0) {
	return Number(amount)
		.toFixed(dec)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



export function getInitials(bizName) {
	const nameArray = bizName?.split(" ");
	const firstInitial = nameArray[0]?.charAt(0);
	const secondInitial = nameArray[1]?.charAt(0);
	return `${firstInitial}${secondInitial}`;
}