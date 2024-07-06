<!-- Developed by Taipei Urban Intelligence Center 2023-2024-->

<!-- Navigation will be hidden from the navbar in mobile mode and moved to the settingsbar -->

<script setup>
const { VITE_APP_TITLE } = import.meta.env;
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import { useAuthStore } from "../../../store/authStore";
import { useDialogStore } from "../../../store/dialogStore";
import UserSettings from "../../dialogs/UserSettings.vue";
import ContributorsList from "../../dialogs/ContributorsList.vue";

const route = useRoute();
const authStore = useAuthStore();
const dialogStore = useDialogStore();
const { isFullscreen, toggle } = useFullscreen();

const linkQuery = computed(() => {
	const { query } = route;
	return `?index=${query.index}`;
});
</script>

<template>
	<div class="navbar">
		<a href="/">
			<div class="navbar-logo">
				<div class="navbar-logo-image">
					<img
						src="../../../assets/images/TUIC.svg"
						alt="tuic logo"
					/>
				</div>
				<div>
					<h1>{{ VITE_APP_TITLE }}</h1>
					<h2>Taipei City Dashboard</h2>
				</div>
			</div>
		</a>
		<div
			v-if="
				authStore.currentPath !== 'admin' &&
				!(authStore.isMobileDevice && authStore.isNarrowDevice)
			"
			class="navbar-tabs"
		>
			<router-link
				v-if="authStore.token"
				:to="`/component`"
				:class="{
					'router-link-active':
						authStore.currentPath.includes('component'),
				}"
			>
				{{ $t("組件瀏覽平台") }}
			</router-link>
			<router-link
				:to="`/dashboard${
					linkQuery.includes('undefined') ? '' : linkQuery
				}`"
			>
				{{ $t("儀表板總覽") }}
			</router-link>
			<router-link
				:to="`/mapview${
					linkQuery.includes('undefined') ? '' : linkQuery
				}`"
			>
				{{ $t("地圖交叉比對") }}
			</router-link>
		</div>
		<div class="navbar-user">
			<button
				v-if="!(authStore.isMobileDevice && authStore.isNarrowDevice)"
				class="hide-if-mobile"
				@click="toggle"
			>
				<span>{{
					isFullscreen ? "fullscreen_exit" : "fullscreen"
				}}</span>
			</button>
			<!-- <div class="navbar-theme">
				<button @click="authStore.toggleTheme">
					theme
					<span>theme</span>
				</button>
			</div> -->
			<div class="navbar-user-info">
				<button><span>language</span></button>
				<ul>
					<li>
						<button @click="authStore.setLanguage('zh')">
							繁體中文
						</button>
					</li>
					<li>
						<button @click="authStore.setLanguage('en')">
							English {{ getProgress(688303, "en") }}%
						</button>
					</li>

					<li>
						<button @click="authStore.setLanguage('Khmer')">
							Khmer {{ getProgress(688303, "km") }}%
						</button>
					</li>
					<li>
						<button @click="authStore.setLanguage('Burmese')">
							Burmese {{ getProgress(688303, "my") }}%
						</button>
					</li>
					<li>
						<button @click="authStore.setLanguage('indonesian')">
							indonesian {{ getProgress(688303, "id") }}%
						</button>
					</li>
					<li>
						<button @click="authStore.setLanguage('vietnamese')">
							Vietnamese {{ getProgress(688303, "vi") }}%
						</button>
					</li>
					<li>
						<button @click="authStore.setLanguage('thai')">
							Thai {{ getProgress(688303, "th") }}%
						</button>
					</li>
					<li>
						<button @click="authStore.setLanguage('japanese')">
							Japanese {{ getProgress(688303, "ja") }}%
						</button>
					</li>
					<li>
						<button @click="authStore.setLanguage('malayalam')">
							Malayalam {{ getProgress(688303, "ml-IN") }}%
						</button>
					</li>
					<li>
						<a
							href="https://crowdin.com/project/TaipeiDashBoardDemo"
							target="_blank"
							rel="noreferrer"
						>
							{{ $t("加入貢獻") }}
						</a>
					</li>
				</ul>
			</div>
			<div class="navbar-user-info">
				<button><span>info</span></button>
				<ul>
					<li>
						<a
							href="https://tuic.gov.taipei/documentation"
							target="_blank"
							rel="noreferrer"
							>{{ $t("技術文件") }}</a
						>
					</li>
					<li>
						<button
							@click="dialogStore.showDialog('contributorsList')"
						>
							{{ $t("專案貢獻者") }}
						</button>
					</li>
				</ul>
				<teleport to="body">
					<ContributorsList />
				</teleport>
			</div>
			<div
				v-if="
					authStore.token &&
					!(authStore.isMobileDevice && authStore.isNarrowDevice)
				"
				class="navbar-user-user"
			>
				<button>
					{{ authStore.user.name }}
				</button>
				<ul>
					<li>
						<button @click="dialogStore.showDialog('userSettings')">
							{{ $t("用戶設定") }}
						</button>
					</li>
					<li
						v-if="
							authStore.currentPath !== 'admin' &&
							authStore.user.is_admin
						"
						class="hide-if-mobile"
					>
						<router-link to="/admin">
							{{ $t("管理員後臺") }}
						</router-link>
					</li>
					<li
						v-else-if="authStore.user.is_admin"
						class="hide-if-mobile"
					>
						<router-link to="/dashboard">
							{{ $t("返回儀表板") }}
						</router-link>
					</li>
					<li>
						<button @click="authStore.handleLogout">
							{{ $t("登出") }}
						</button>
					</li>
				</ul>
				<teleport to="body">
					<user-settings />
				</teleport>
			</div>
			<div
				v-else-if="
					!(authStore.isMobileDevice && authStore.isNarrowDevice)
				"
				class="navbar-user-user"
			>
				<button @click="dialogStore.showDialog('login')">
					{{ $t("登入") }}
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import crowdin from "@crowdin/crowdin-api-client";
const { translationStatusApi } = new crowdin({
	token: "0f2b00278afc836ccd296ca0806e788c06095414442f8e04f3d686d2a497c66ca9626af60fbef25e",
});
let progress;
export async function getProgress1(projectId, languageId) {
	// console.log(getProgress1(projectId, languageId));
	// return getProgress1(projectId, languageId);

	await translationStatusApi
		.getLanguageProgress(projectId, languageId)
		.then((response) => {
			// console.log("Progress:");
			// console.log(response.data[0].data.approvalProgress);
			progress = response.data[0].data.approvalProgress;
		});
	// console.log(progress);
}
function getProgress(projectId, languageId) {
	console.log(getProgress1(projectId, languageId));
	console.log(progress);
	return progress;
}
</script>
<style scoped lang="scss">
.navbar {
	height: 60px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid var(--color-border);
	background-color: var(--color-component-background);
	user-select: none;

	&-logo {
		display: flex;

		h1 {
			font-weight: 500;
		}

		h2 {
			font-size: var(--font-s);
			font-weight: 400;
		}

		&-image {
			width: 22.94px;
			height: 45px;
			margin: 0 var(--font-m);

			img {
				height: 45px;
				filter: invert(1);
			}
		}
	}

	&-tabs {
		display: flex;

		a {
			height: 59px;
			display: flex;
			align-items: center;
			margin-left: var(--font-s);
			transition: opacity 0.2s, border-bottom 0.2s;
			border-bottom: solid 3px transparent;

			&:hover {
				opacity: 0.8;
			}
		}

		.router-link-active {
			border-bottom: solid 3px var(--color-highlight);
			color: var(--color-highlight);

			&:hover {
				opacity: 1;
			}
		}

		@media screen and (max-width: 750px) {
			display: none;
		}
		@media screen and (max-height: 500px) {
			display: none;
		}
	}

	&-user {
		display: flex;
		align-items: center;

		li a,
		button {
			display: flex;
			align-items: center;
			margin-right: var(--font-m);
			padding: 2px 4px;
			border-radius: 4px;
			font-size: var(--font-m);
			transition: background-color 0.25s;
		}

		span {
			font-family: var(--font-icon);
			font-size: calc(var(--font-l) * var(--font-to-icon));
		}

		&-user:hover ul,
		&-info:hover ul {
			display: block;
			opacity: 1;
		}

		&-user,
		&-info {
			height: 60px;
			min-width: 100px;
			display: flex;
			align-items: center;
			justify-content: center;

			@media screen and (max-width: 750px) {
				display: none;
			}
			@media screen and (max-height: 500px) {
				display: none;
			}

			ul {
				min-width: 100px;
				display: none;
				position: absolute;
				right: 20px;
				top: 55px;
				padding: 8px;
				border-radius: 5px;
				background-color: rgb(85, 85, 85);
				opacity: 0;
				transition: opacity 0.25s;
				z-index: 10;

				li {
					border-radius: 5px;
					transition: background-color 0.25s;

					a,
					button {
						padding: 8px 6px;
						width: 100%;
						height: 100%;
					}
				}

				li:hover {
					background-color: var(--color-complement-text);
				}
			}
		}

		&-info {
			min-width: 0;

			ul {
				right: 120px;
				top: 55px;
			}

			@media screen and (max-width: 750px) {
				display: flex;

				ul {
					right: 20px;
					top: 55px;
				}
			}
			@media screen and (max-height: 500px) {
				display: flex;
			}
		}
	}
}
</style>
