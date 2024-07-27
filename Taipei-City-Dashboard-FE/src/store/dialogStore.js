// Developed by Taipei Urban Intelligence Center 2023-2024

/* dialogStore */
/*
The dialogStore stores all states related to the popups and dialogs in the application.
To add a new dialog to the existing list, simply give the dialog a name and add it to "dialogs".
Then, in the component add a conditional statement to render the component only if it's value is switched to true.
Finally, remember to add the component to the application.
*/
import crowdin from "@crowdin/crowdin-api-client";

import { defineStore } from "pinia";
const { usersApi } = new crowdin({
	token: "463c35ecd5fce395043409e81a3bb9d190c722219f930240967952a0c2562a0ac0bbbd6eef230294",
});

export const useDialogStore = defineStore("dialog", {
	state: () => ({
		dialogs: {
			// Admin Dialogs: /components/dialogs/admin
			adminComponentSettings: false,
			adminAddEditDashboards: false,
			adminEditIssue: false,
			adminEditDisaster: false,
			adminAddComponent: false,
			adminDeleteDashboard: false,
			adminEditUser: false,
			adminAddEditContributor: false,
			adminDeleteContributor: false,
			adminAddComponentTemplate: false, // BETA
			// Public Dialogs: /components/dialogs
			addComponent: false,
			addDashboard: false,
			dashboardSettings: false,
			addEditDashboards: false,
			initialWarning: false,
			login: false,
			mobileLayers: false,
			mobileNavigation: false,
			moreInfo: false,
			notificationBar: false,
			reportIssue: false,
			userSettings: false,
			embedComponent: false,
			incidentReport: false, // BETA
			contributorsList: false,
			contributorInfo: false,
			addPin: false,
			addViewPoint: false,
			findClosestPoint: false,
		},
		// Stores the content for notifications
		notification: {
			status: "",
			message: "",
		},
		// Stores the content for report issue dialogs
		issue: {
			id: null,
			index: null,
			name: "",
		},
		// Stores the content for more info dialogs
		moreInfoContent: null,
		// Stores Edit or Add mode for addeditdashboards dialog
		addEdit: "",
		// Stores the current timeout for notifications
		curTimeout: null,
		translators: [],
	}),
	getters: {},
	actions: {
		// Show the dialog passed into the function
		showDialog(dialog) {
			this.dialogs[dialog] = true;
		},
		// Will hide all dialogs currently active
		hideAllDialogs() {
			const keys = Object.keys(this.dialogs);
			for (let i = 0; i < keys.length; i++) {
				if (keys[i] === "notificationBar") {
					continue;
				}
				this.dialogs[keys[i]] = false;
			}
			this.moreInfoContent = null;
		},
		// Show the notification bar and update the notification message
		showNotification(status, message, showtime = 3000) {
			this.dialogs.notificationBar = false;
			clearTimeout(this.curTimeout);
			setTimeout(() => {
				this.showDialog("notificationBar");
			}, 20);
			this.notification = {
				status: status, // success, fail, info
				message: message,
			};
			this.curTimeout = setTimeout(() => {
				this.dialogs.notificationBar = false;
			}, showtime);
		},
		// Show the more info dialog and update the content
		showMoreInfo(content) {
			this.showDialog("moreInfo");
			this.moreInfoContent = content;
		},
		// Show the report issue dialog and enter the id and name of the component of origin
		showReportIssue(id, index, name) {
			this.showDialog("reportIssue");
			this.issue = {
				id: id,
				index: index,
				name: name,
			};
		},
		async getTransContributors() {
			await usersApi.listProjectMembers(688303).then((res) => {
				res.data.forEach((element) => {
					this.translators.push(element.data.username);
					return this.translators;
				});
			});
		},
	},
});
