<script setup>
const props = defineProps({
    message: {
        type: Object,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});

function getSource(message) {
    const source = message.match(/(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/)[0].replace(" ", "");
    return source;
}

function getText(message) {
    if (message.includes("IMAGEM")) {
        return message.replace(/IMAGEM:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) TEXTO: /, "");
    }
    if (message.includes("DOCUMENTO")) {
        return message.replace(/DOCUMENTO:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) NOME: /, "");
    }
    return message.replace(/VIDEO:(http|ftp| https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]) TEXTO: /, "");
}

const time = (message) => {
    const date = new Date(message.created_at);
    return date.getMinutes() < 10 ? date.getHours() + ":0" + date.getMinutes() : date.getHours() + ":" + date.getMinutes();
};
</script>

<template>
    <div :key="index" :class="props.message.from_me === '1'
        ? 'bg-indigo-100 p-5 rounded-xl w-fit h-fit my-3 place-self-end'
        : 'bg-blue-100 p-5 rounded-xl w-fit h-fit my-3'
        ">
        <div class="flex justify-between">
            <h3 :class="'text-indigo-700 break-words capitalize font-bold'">
                {{ user }}
            </h3>
            <p class="ml-3">
                {{ time(props.message) }}
            </p>
        </div>
        <div v-if="message.message.includes('IMAGEM: ')">
            <img :src="getSource(message.message)" class="w-full h-full max-w-xs max-h-60" />
            <p v-if="getText(message.message).length > 0" class="my-3 break-all">
                {{ getText(message.message) }}
            </p>
        </div>
        <div v-else-if="message.message.includes('DOCUMENTO: ')">
            <a class="my-3 break-all" :href="getSource(message.message)">
                {{ "DOCUMENTO: " + getText(message.message) }}
            </a>
        </div>
        <div v-else-if="message.message.includes('VIDEO: ')">
            <video class="w-full h-full max-w-xs max-h-60" controls>
                <source :src="getSource(message.message)" type="video/mp4" />
                <source :src="getSource(message.message)" type="video/ogg" />
                Your browser does not support the video tag.
            </video>
            <p v-if="getText(message.message).length > 0" class="my-3 break-all">
                {{ getText(message.message) }}
            </p>
        </div>
        <p v-else class="my-3 break-all">
            {{ message.message }}
        </p>
    </div>
</template>