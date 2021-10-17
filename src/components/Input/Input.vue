<template>
    <div class="input-group">
        <button class="btn btn-outline-secondary px-4 disabled">
            {{ label }}
        </button>
        <input
            @keypress="keyPress"
            class="form-control p-2 fs-5 pe-3"
            style="text-align: right"
            placeholder="0."
            :value="getData"
            @input="setData"
        />
    </div>
</template>
<script>
export default {
    emits: ['onChange'],
    props: {
        label: {
            type: String,
            default: () => 'BIN',
        },
        value: {
            type: String,
            default: () => null,
        },
    },
    computed: {
        getData() {
            if (this.value) return this.value
            return ''
        },
    },
    methods: {
        keyPress(e) {
            switch (this.label) {
                case 'BIN': {
                    if (/[0-1]/i.test(e.key) || e.keyCode == 8) return
                    e.preventDefault()
                    break
                }
                case 'DEC': {
                    if (/[0-9]/i.test(e.key) || e.keyCode == 8) return
                    e.preventDefault()
                    break
                }
                case 'OCT': {
                    if (/[0-7]/i.test(e.key) || e.keyCode == 8) return
                    e.preventDefault()
                    break
                }
                case 'HEX': {
                    if (/[0-9A-F]/i.test(e.key) || e.keyCode == 8) return
                    e.preventDefault()
                    break
                }
            }
        },
        setData(e) {
            this.$emit('onChange', e.target.value)
        },
    },
}
</script>
<style lang="sass" scoped src="./Input.sass"></style>
