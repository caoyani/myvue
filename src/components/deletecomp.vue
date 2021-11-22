<template>
    <el-main class="delComponent">
        <el-form ref="deleteForm" :model="deleteForm" :rules="rules" label-width="30%">

            <el-form-item prop="component" :label="$t('deleteComp.delcomp')" class="grid-content bg-purplr-light">
                <el-select v-model="deleteForm.component" multiple :placeholder="$t('deletecomp.selectcomp')" style="width: 100%">
                    <el-option v-for="item in deleteForm.components" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-card class="box-card" v-if="deleteForm.component&&deleteForm.component.indexOf('1')!=-1">
                <div slot="header" class="box-card-header">
                    <span>Header 1</span>
                </div>
                <el-form-item prop="as400Env" label="delete env" class="grid-content bg-purplr-light">
                    <el-input placeholder="eg: xxxxxx" v-model="deleteForm.as400Env"></el-input>
                </el-form-item>
                <div class="comment">
                    <span>this is comment</span>
                    <div>this is another comment.</div>
                </div>
            </el-card>

            <el-card class="box-card" v-if="deleteForm.component&&deleteForm.component.indexOf('2')!=-1">
                <div slot="header" class="box-card-header">
                    <span>Header 1</span>
                </div>
                <el-form-item prop="as400Env" label="delete env" class="grid-content bg-purplr-light">
                    <el-input placeholder="eg: xxxxxx" v-model="deleteForm.as400Env"></el-input>
                </el-form-item>
                <div class="comment">
                    <span>this is comment</span>
                    <div>this is another comment.</div>
                </div>
            </el-card>

           
        </el-form>

        <div id=sbmbutton>
            <el-button class="footer-button" type="primary" @click="submitWarn('deleteForm')">{{$t("home.submit")}}</el-button>
            <el-button class="footer-button" @click="resetForm('deleteForm')" round disabled>{{$t("home.reset")}}</el-button>
        </div>

    </el-main>
</template>

<script>
import axios from "@/axios.js"

export default {
    data() {
        return {
            form: {
                component: [],
                streamName: "",
                as400Env: "",
                email: this.$store.state.mail,
                staffid: this.$store.state.sid,
                profile: this.$store.state.username,
                components: [
                    {
                        value: "1",
                        label: this.$t('deletecomp.delL400');
                    },
                    {
                        value: "2",
                        label: this.$t('deletecomp.delL400');
                    },
                ],
                
            },
            rules: {
                as400Env: [
                    //blur是鼠标拾取焦点时会触发验证
                    {required: true, message: "please select POD."},
                    {min: 3, max: 5, message: 'length shoule be from 3 to 5', trigger: 'blur'},

                ],
                component: [
                    {required: true, message: "please select components."},
                ],
                arcadVersion: [
                    {required: true, message: "please pick a release date."},
                    {min: 3, max: 5, message: 'length shoule be from 3 to 5', trigger: 'blur'},
                    {pattern: /^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]$/, message: 'the pattern should be 99.99.99'}

                ],
                aaa: [
                    {required: true, message: "please pick a release date."},
                    {min: 3, max: 5, message: 'length shoule be from 3 to 5'},

                ],
            }

        }
    },
    mounted: function() {

    },
    methods: {
        submitWarn(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    this.$confirm(this.$t("deletecomp.delwarning"), 'Warning', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }).then(() => {
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
                    }).catch(() => {
                        this.$message({
                            message: this.$t("common.delok"),
                            type: 'info'
                        });
                    });
                } else {
                    console.log('error submit!');
                    return false;
                }

            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
            // this.$refs.form.resetFields();
        },


    },

}

</script>

<style scoped>

</style>