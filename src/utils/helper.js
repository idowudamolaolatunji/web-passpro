import moment from "moment";

export function formatNumber(amount, dec = 0) {
	return Number(amount)
		.toFixed(dec)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getInitials(name) {
	const nameArray = name?.split(" ");
	const firstInitial = nameArray[0]?.charAt(0);
	const secondInitial = nameArray[1]?.charAt(0);
	return `${firstInitial}${secondInitial}`;
}

export function validateEventForm(data) {
	const errors = {};

	if (!data?.category_id) {
		errors.category_id = "No category selected";
	}
	if (!data?.event_type) {
		// errors.event_type = "No event type selected";
	}
	if (!data?.event_name?.trim()) {
		errors.event_name = "Event name is required";
	}
	if (!data?.event_description?.trim()) {
		errors.event_description = "Event description is required";
	}
	if (!data?.event_location?.trim()) {
		errors.event_location = "Event location is required";
	}
	if (!data?.start_date?.trim()) {
		errors.start_date = "Event start date is required";
	}
	if (!data?.start_date_time?.trim()) {
		errors.start_date_time = "Event start time is required";
	}
	if (!data?.end_date?.trim()) {
		errors.end_date = "Event end date is required";
	}
	if (!data?.end_date_time?.trim()) {
		errors.end_date_time = "Event end time is required";
	}

	return errors;
}

export function validateTicketForm(data) {
	const errors = {};

	if (!data?.ticket_name?.trim()) {
		errors.ticket_name = "Ticket name is required";
	}
	if (!data?.ticket_description?.trim()) {
		errors.ticket_description = "Ticket description is required";
	}
	if (!data?.ticket_stock?.trim()) {
		errors.ticket_stock = "No stock type is selected";
	}
	if (data?.ticket_stock == "Limited Stock" && !data?.ticket_quantity?.trim()) {
		errors.ticket_quantity = "Ticket quantity is required";
	}
	if (data?.ticket_type == "paid" && !data?.ticket_price?.trim()) {
		errors.ticket_price = "Ticket price is required";
	}
	if (!data?.ticket_purchase_limit?.trim()) {
		errors.ticket_purchase_limit = "No purchase limit is selected";
	}
	if (data?.ticket_category == "Group Ticket" && !data?.group_size?.trim()) {
		errors.group_size = "No group size is selected";
	}

	return errors;
}

export function validatePasswordUpdateForm(data) {
	const errors = {};

	if (!data.current_password) {
		errors.current_password = "Password is required";
	} else if (data.current_password.length < 8) {
		errors.current_password = "Password must be at least 8 characters long";
	}

	if (!data.new_password) {
		errors.password = "New password is required";
	} else if (data.new_password.length < 8) {
		errors.new_password = "new Password must be at least 8 characters long";
	}

	if (!data.new_password_confirmation) {
		errors.new_password_confirmation = "New password comfirmation is required";
	} else if (data.new_password_confirmation !== data.new_password) {
		errors.new_password_confirmation = "New passwords do not match";
	}
	
	return errors;
}

export function formatDateTime(date, time) {
	const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
	return dateTime.format("YYYY-MM-DD  h:mmA");
}


export function formatStringDateTime(date, time) {
	return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm").format("Do MMMM, YYYY - h:mm A");
}
  

export function truncateString(input, num = 30) {
	if (input?.length > num) {
		return input?.substring(0, num) + "...";
	} else {
		return input;
	}
}

export function splitLink(link) {
	const splitted = link?.includes("@") ? link?.split("@") : link?.split("/");
	return splitted?.at(-1);
}