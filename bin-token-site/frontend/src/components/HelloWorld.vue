<template>
  <div>
    <h2>领取 300 BIN 代币</h2>
    <button @click="claimTokens" :disabled="loading">
      {{ loading ? '领取中...' : '领取300 BIN' }}
    </button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getContract } from '../web3.js';

const loading = ref(false);
const message = ref('');

async function claimTokens() {
  loading.value = true;
  message.value = '';
  try {
    const contract = await getContract();
    const tx = await contract.claimFromWebsite();
    message.value = '交易已发送，等待确认...';
    await tx.wait();
    message.value = '领取成功！300 BIN 已到账！';
  } catch (error) {
    console.error(error);
    message.value = '领取失败: ' + (error?.message || error);
  } finally {
    loading.value = false;
  }
}
</script>
