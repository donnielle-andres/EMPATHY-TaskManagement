<template>
    <aside>
        <!-- User Information -->
        <div class="user-profile" v-if="fullName">
            <div class="user-img">
                <img class="usericn" src="../assets/account_circle.png">
            </div>

            <div class="user-info">
                {{ this.fullName }}
            </div>
        </div>

        <!-- Side Bar Options (Dashboard and Schedule Board)-->
        <div class="menu-wrap">
            <div class="menu-item">
                <i class="material-symbols-outlined">dashboard</i>
                <span class="menu-name" @click="gotoDashboard()" >Dashboard</span>
            </div>

            <div class="menu-item-setting">
                <i class="material-symbols-outlined">settings</i>
                <span class="menu-name" @click="gotoSettings()">Settings</span>
            </div>

        </div>
    </aside>
</template>


<script>
import { db } from '../util/firebase.js'
import { doc, getDoc } from "firebase/firestore";

export default {
    name: 'SideNav',
    data() {
        return {
            fullName: null,
            userId: null
        }
    },

    watch: {
      '$route.params.id': {
        handler(newVal, oldVal) {
          this.userId = newVal;
          this.fetchUserData1();
        },
      },
    },

    methods: {
        gotoDashboard() {
            this.$router.push({ name: 'MainPage' });
        },

        gotoSchedule() {
            this.$router.push({ name: 'SchedBoard' });
        },

        gotoSettings() {
            this.$router.push({ name: 'SettingsPage' });
        },

        async fetchUserData1() {
            const userRef = doc(db, "Users", this.userId)
            const userResult = await getDoc(userRef);
            this.fullName = userResult.data().Name
        }
    }
}
</script>

<style scoped>
    aside {
        position: fixed; /* This makes the aside stick to the side */
        top: 0; /* Positions the aside at the top of the viewport */
        left: 0; /* Positions the aside at the left of the viewport */
        width: 200px;
        background-color: #E7E7E7;
        overflow: hidden;
        min-height: 100vh; /* Adjusts the height to be at least the height of the viewport */
        padding: 10px;
        font-size: medium;
        font-weight: bolder;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); /* Adds a drop shadow */
        z-index: 1000; /* Ensures the aside stays on top of other content */
    }

    /* User */
    .user-profile {
        display: flex;
        align-items: center; /* Aligns items vertically in the center */
        margin-top: 20px;
        margin-left: 10px;
    }

    .usericn {
        width: 35px;
    }

    .user-info {
        padding-left: 10px;
        text-align: center;
    }

    /* Menu */
    .menu-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* This will push the first child to the top and the last child to the bottom */
        gap: 40px;
        margin: 30px;
        margin-top: 45px;
        align-items: left;
        cursor: pointer;
        height: 100%; /* Ensure it takes up the full height of the aside */
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .menu-item-setting {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .menu-item:hover, .menu-item-setting:hover {
        color: rgba(0, 0, 0, 0.63);
    }


</style>