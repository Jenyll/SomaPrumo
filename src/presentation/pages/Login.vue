<script setup lang="ts">
defineOptions({ name: 'LoginPage' })
</script>

<template>
  <main class="login-page">
    <section class="login-brand" aria-labelledby="login-brand-title">
      <a href="/" class="back-link">← Voltar para o site</a>
      <div>
        <p class="eyebrow">Área do cliente</p>
        <h1 id="login-brand-title">Sua operação,<br /><em>em um só lugar.</em></h1>
        <p>Financeiro, documentos, obrigações e acompanhamento com a clareza do SomaPrumo.</p>
      </div>
      <p class="brand-note">Operações com clareza.</p>
    </section>

    <section class="login-form-wrap" aria-labelledby="login-title">
      <div class="login-form">
        <p class="eyebrow">Entrar</p>
        <h2 id="login-title">Acesse sua conta.</h2>
        <p class="login-support">Esta tela prepara a experiência da área do cliente. A autenticação real será conectada quando o backend estiver definido.</p>

        <form @submit.prevent>
          <label>
            <span>E-mail</span>
            <input type="email" autocomplete="email" placeholder="seu@email.com" />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" autocomplete="current-password" placeholder="••••••••" />
          </label>
          <button type="submit" class="button button-dark" disabled>Entrar</button>
        </form>

        <p class="login-note">Acesso ainda não habilitado. Nenhuma credencial é enviada ou armazenada nesta versão.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.login-page { display: grid; min-height: 100vh; grid-template-columns: 1.05fr .95fr; background: var(--color-bg-light); }
.login-brand { display: flex; flex-direction: column; justify-content: space-between; padding: clamp(32px, 5vw, 72px); background: var(--color-bg-dark); color: var(--color-text-light); }
.back-link { min-height: 44px; width: fit-content; color: var(--color-text-muted-light); font-size: .72rem; text-decoration: none; }
.login-brand h1 { margin: 0; font-size: clamp(3.5rem, 7vw, 6.8rem); line-height: .9; }
.login-brand h1 em { color: var(--color-brand-primary); font-weight: 400; }
.login-brand > div > p:last-child { max-width: 520px; color: var(--color-text-muted-light); }
.brand-note { color: var(--color-brand-primary); font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; }
.login-form-wrap { display: grid; place-items: center; padding: 40px; }
.login-form { width: min(100%, 440px); }
.login-form h2 { margin: 0; font-size: clamp(2.6rem, 4vw, 4rem); }
.login-support { margin: 18px 0 34px; color: var(--color-text-muted); font-size: .82rem; line-height: 1.7; }
form { display: grid; gap: 20px; }
label { display: grid; gap: 8px; }
label span { font-size: .7rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
input { min-height: 52px; padding: 0 14px; border: 1px solid var(--color-border); border-radius: 0; background: transparent; color: var(--color-text-dark); }
button { width: 100%; margin-top: 8px; }
button:disabled { cursor: not-allowed; opacity: .55; }
.login-note { margin-top: 18px; color: var(--color-text-muted); font-size: .68rem; line-height: 1.6; }
@media (max-width: 767px) { .login-page { grid-template-columns: 1fr; } .login-brand { min-height: 46vh; } .login-brand h1 { font-size: 3.8rem; } .login-form-wrap { padding: 48px 24px 64px; } }
</style>
