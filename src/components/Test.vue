<template>
    <div>111</div>
</template>

<script>
import request from "../apis/axios";
export default {
    data() {
        return {
            id: '60403',
            city: []
        }
    },
    created() {
        this.testT();
        this.saveCity();
    },
    methods: {
        testT() {
           request.getYesterday(this.id).then((res) => {
               (res.data);
            // 获取本地存储
               let city2 = localStorage.getItem("city");
               
           }) 
        },
        saveCity() {
            // 本地存储
            let city = [
                {id: this.id,title: '广州'},
                {id: 2,title: '深圳'},
                {id: 3,title: '上海'},
            ];
            this.city = city;
            localStorage.setItem("city",JSON.stringify(this.city));
        }
    },
}
</script>