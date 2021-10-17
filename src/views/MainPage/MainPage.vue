<template>
    <div class="container">
        <span>SANOQ SISTEMA</span>
        <div class="inputs">
            <app-input
                label="BIN"
                @onChange="changeInputData"
                :value="binaryCode"
            ></app-input>
            <app-input label="DEC"></app-input>
            <app-input label="OCT"></app-input>
            <app-input label="HEX"></app-input>
            <binary-panel @onChangeBits="setInputBIN" :bits="binaryData">
            </binary-panel>
        </div>
    </div>
</template>
<script>
import Input from '@/components/Input/Input.vue'
import Bpanel from '@/components/BinaryPanel/BinaryPanel.vue'
export default {
    components: {
        'app-input': Input,
        'binary-panel': Bpanel,
    },
    data() {
        return {
            binaryData: [],
            binaryCode: '',
        }
    },
    methods: {
        changeInputData(value) {
            this.binaryData = value.split('')
        },
        setInputBIN(bits) {
            this.binaryCode = bits
        },
    },
}
</script>
<style lang="sass" scoped src="./MainPage.sass"></style>
