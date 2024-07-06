// const { projectsGroupsApi } = new crowdin({
// 	token: "0f2b00278afc836ccd296ca0806e788c06095414442f8e04f3d686d2a497c66ca9626af60fbef25e",
// });

// async function getLanguage(projectId) {
// 	projectsGroupsApi
// 		.getProject(projectId)
// 		.then((projects) => {
// 			console.log("LangID list:");
// 			console.log(projects.data.targetLanguageIds);
// 			targetLang = projects.data.targetLanguageIds;
// 		})
// 		.catch((error) => console.error(error));
// }
// getLanguage(688303);
async function getProgress1(projectId, languageId) {
	// let progress;
	// await translationStatusApi
	// 	.getLanguageProgress(projectId, languageId)
	// 	.then((response) => {
	// 		// console.log("Progress:");
	// 		console.log(response.data[0].data.approvalProgress);
	// 		progress = response.data;
	// 		console.log(progress[0].data.approvalProgress);
	// 	});
}
