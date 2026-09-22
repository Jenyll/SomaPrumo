<script setup lang="ts">
</script>

<template>
  <main class="login-page" aria-labelledby="login-title">
    <div class="container login-shell">
      <section class="login-card" aria-label="Acesso de demonstração">
        <p class="eyebrow">Acesso</p>
        <h1 id="login-title">Entrar</h1>
        <p class="login-copy">Acesso demonstrativo para a experiência visual. Nenhuma autenticação real está ativa neste frontend.</p>

        <form class="login-form" @submit.prevent>
          <label>
            <span>E-mail</span>
            <input type="email" value="contato@somaprumo.com" aria-label="E-mail" />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" value="••••••••" aria-label="Senha" />
          </label>
          <button type="button" class="button button-dark is-placeholder-action">Entrar</button>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  background: linear-gradient(180deg, var(--color-bg-light) 0%, rgba(231, 221, 208, 0.5) 100%);
}

.login-shell {
  width: min(100%, 520px);
}

.login-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--color-border);
  padding: clamp(24px, 4vw, 40px);
}

.login-card h1 {
  font-size: clamp(3rem, 6vw, 4rem);
  margin-top: 0;
}

.login-copy {
  margin: 18px 0 28px;
  color: var(--color-text-muted);
}

.login-form {
  display: grid;
  gap: 18px;
}

.login-form label {
  display: grid;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-dark);
}

.login-form input {
  min-height: 48px;
  border: 1px solid var(--color-border);
  background: var(--sp-white);
  padding: 12px 14px;
  color: var(--color-text-dark);
}

.button {
  width: fit-content;
}
</style>
