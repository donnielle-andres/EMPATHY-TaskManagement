<template>
    <aside>
        <!-- User Information -->
        <div class="user-profile">
            <div class="user-img">
                <img class="usericn" src="../assets/account_circle.png">
            </div>

            <div class="user-info">
                John Doe
            </div>
        </div>

        <!-- Side Bar Options (Dashboard and Schedule Board)-->
        <div class="menu-wrap">
            <div class="menu-item">
                <i class="material-symbols-outlined">dashboard</i>
                <span class="menu-name" @click="gotoDashboard()" >Dashboard</span>
            </div>

            <div class="menu-item">
                <i class="material-symbols-outlined">today</i>
                <span class="menu-name" @click="gotoSchedule()">Schedule</span>
            </div>

            <div class="menu-item-setting">
                <i class="material-symbols-outlined">settings</i>
                <span class="menu-name" @click="gotoSettings()">Settings</span>
            </div>

        </div>
    </aside>
</template>


<script>
export default {
 name: 'SideNav',
 methods: {
        gotoDashboard() {
            this.$router.push({ name: 'MainPage' });
        },

        gotoSchedule() {
            this.$router.push({ name: 'SchedBoard' });
        },

        gotoSettings() {
            this.$router.push({ name: 'SettingsPage' });
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
        gap: 40px; /* Adds some space between menu items */
        margin: 30px;
        margin-top: 45px;
        align-items: left;
        cursor: pointer;
    }

    .menu-item {
        display: flex;
        align-items: center; /* Aligns icon and text vertically in the center */
        gap: 10px; /* Adds some space between the icon and the text */
    }

    .menu-item-setting {
        margin-top: 410px;
        display: flex;
        align-items: center;
        gap: 10px; 
    }

    .menu-item:hover, .menu-item-setting:hover {
        color: rgba(0, 0, 0, 0.63);
    }

    

</style>