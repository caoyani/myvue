<template>
    <el-main class="streamenv">
        <el-form ref="form" :model="form" :rules="rules">
            <el-row>
                <el-col :span="11">
                    <div class="grid-content bg-purple grid-content-right">{{$t("createcomp.podid")}}</div>
                </el-col>
                <el-col :span="13">
                    <el-form-item prop="podID" class="grid-content bg-purplr-light">
                        <el-select v-model="form.podID" :placeholder="$t('createcomp.select')" style="width: 100%" size="large">
                            <el-option label="INHK POD 1" value="1"></el-option>
                            <el-option label="INHK POD 2" value="2"></el-option>
                            <el-option label="INHK POD 3" value="3"></el-option>
                            <el-option label="INHK POD 4" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <div class="grid-content bg-purple grid-content-right">{{$t("createcomp.email")}}</div>
                </el-col>
                <el-col :span="13">
                    <el-form-item prop="email" class="grid-content bg-purplr-light">
                        <el-input placeholder="eg: xxxx@qq.com" v-model="form.email" size="large" value></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <div class="grid-content bg-purple grid-content-right">{{$t("createcomp.rlsdate")}}</div>
                </el-col>
                <el-col :span="13">
                    <el-form-item prop="releaseDate" class="grid-content bg-purplr-light">
                        <el-date-picker v-model="form.releaseDate" type="date" style="width:100%" size="large" :placeholder="$t('createcomp.pickdate')" value-format="yyyyMMdd"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <div class="grid-content bg-purple grid-content-right">{{$t("createcomp.createcomp")}}</div>
                </el-col>
                <el-col :span="13">
                    <el-form-item prop="component" class="grid-content bg-purplr-light">
                        <el-select v-model="form.component" multiple :placeholder="$t('createcomp.selectcomp')" style="width: 100%" size="large">
                            <el-option v-for="item in form.components" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-card class="box-card" v-if="form.component&&form.component.indexOf('1')!=-1">
                <div slot="header" class="box-card-header">
                    <span>Header 1</span>
                </div>
                <el-row>
                    <el-col :span="11">
                       <div class="grid-content bg-purple grid-content-right">{{$t("createcomp.email")}}</div>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item prop="releaseDate">
                            <el-date-picker v-model="form.releaseDate" type="date" style="width:100%" size="large" :placeholder="$t('createcomp.pickdate')" value-format="yyyyMMdd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="comment">
                    <span>this is comment</span>
                    <div>this is another comment.</div>
                </div>
            </el-card>

            <el-card class="box-card" v-if="form.component&&form.component.indexOf('2')!=-1">
                <div slot="header" class="box-card-header">
                    <span>Header 1</span>
                </div>
                <el-row>
                    <el-col :span="11">
                       <div class="grid-content bg-purple grid-content-right">{{$t("createcomp.email")}}</div>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item prop="releaseDate">
                            <el-date-picker v-model="form.releaseDate" type="date" style="width:100%" size="large" :placeholder="$t('createcomp.pickdate')" value-format="yyyyMMdd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="comment">
                    <span>this is comment</span>
                    <div>this is another comment.</div>
                </div>
            </el-card>
            
            <el-card class="box-card" v-if="form.component&&form.component.indexOf('3')!=-1">
                <div slot="header" class="box-card-header">
                    <span>Header 1</span>
                </div>
                <el-row>
                    <el-col :span="11">
                       <div class="grid-content bg-purple grid-content-right">{{$t("createcomp.email")}}</div>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item prop="releaseDate">
                            <el-date-picker v-model="form.releaseDate" type="date" style="width:100%" size="large" :placeholder="$t('createcomp.pickdate')" value-format="yyyyMMdd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="comment">
                    <span>this is comment</span>
                    <div>this is another comment.</div>
                    <h3><a href="http://abcd:8080/a/b" target="view_window">Link link</a></h3>
                </div>
            </el-card>
            
        </el-form>

        <div id=sbmbutton>
            <el-button class="footer-button" type="primary" @click="subform('form')">{{$t("home.submit")}}</el-button>
            <el-button class="footer-button" @click="resetForm('deleteForm')" round disabled>{{$t("home.reset")}}</el-button>
        </div>

    </el-main>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
// export default defineComponent({
//     setup() {
        
//     },
// })

import axios from "@/axios.js"

export default {
    data() {
        return {
            form: {
                podID: "",
                component: [],
                releaseDate: "",
                checkList: [],
                email: this.$store.state.mail,
                staffid: this.$store.state.sid,
                profile: this.$store.state.username,
                components: [
                    {
                        value: "1",
                        label: "string 1"
                    },
                    {
                        value: "2",
                        label: "string 2"
                    },
                    {
                        value: "3",
                        label: "string 3"
                    },
                ],
                
            },
            email: this.$store.state.mail,
            staffid: this.$store.state.sid,
            profile: this.$store.state.username,
            rules: {
                podID: [
                    {required: true, message: "please select POD."}
                ],
                component: [
                    {required: true, message: "please select components."}
                ],
                releaseDate: [
                    {required: true, message: "please pick a release date."}
                ],
                aaa: [
                    {required: true, message: "please pick a release date."},
                    {min: 3, max: 5, message: 'length shoule be from 3 to 5'}

                ],
            }

        }
    },
    mounted: function() {

    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    axios.automation_axios(this.form).then(({data}) => {
                        console.info("6666666----"+ JSON.stringify(data));

                        const loading = this.$loading({
                            lock: true,
                            text: this.$t("common.loading"),
                            spinner: 'el-icon-loading',
                            background: 'rgba(55, 55, 55, 0.4)',
                            target: document.querySelector(".streamenv"),
                        });

                        this.$refs.form.resetFields();
                        this.$message({
                            message: this.$t("common.delok"),
                            type: 'success'
                        });
                        loading.close();


                        // if(data.result == true) {
                        //     this.$message({
                        //         message: this.$t("common.delok"),
                        //         type: 'success'
                        //     });
                        // } else {
                        //     this.$message.error('submit failed.');
                        // }

                    });
                } else {
                    console.log('error submit!');
                    return false;
                }

            });
        },


    },

}

</script>

<style scoped>

</style>