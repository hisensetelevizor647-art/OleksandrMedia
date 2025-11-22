<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { Video, Globe, Palette, ArrowRight } from "lucide-svelte";

    export let onComplete: () => void;

    let visible = true;

    function enter() {
        visible = false;
        setTimeout(() => {
            onComplete();
        }, 500);
    }

    onMount(() => {
        // Auto-enter after 5 seconds if user doesn't click
        const timer = setTimeout(() => {
            if (visible) enter();
        }, 5000);

        return () => clearTimeout(timer);
    });
</script>

{#if visible}
    <div class="splash" out:fade={{ duration: 500 }}>
        <div class="content" in:fly={{ y: 20, duration: 800, delay: 200 }}>
            <div class="logo-container">
                <img src="/logo.svg" alt="OleksandrMedia" class="logo" />
                <h1>OleksandrMedia</h1>
            </div>

            <div class="features">
                <div class="feature">
                    <div class="icon-box red">
                        <Video size={24} />
                    </div>
                    <span>Premium Video Experience</span>
                </div>
                <div class="feature">
                    <div class="icon-box blue">
                        <Globe size={24} />
                    </div>
                    <span>Multi-language Support</span>
                </div>
                <div class="feature">
                    <div class="icon-box purple">
                        <Palette size={24} />
                    </div>
                    <span>New Red Design</span>
                </div>
            </div>

            <button class="enter-btn" on:click={enter}>
                <span>Enter Platform</span>
                <ArrowRight size={20} />
            </button>
        </div>
    </div>
{/if}

<style>
    .splash {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 48px;
        padding: 24px;
        max-width: 400px;
        width: 100%;
    }

    .logo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .logo {
        width: 80px;
        height: 80px;
    }

    h1 {
        font-size: 32px;
        font-weight: 700;
        background: linear-gradient(45deg, #ff0000, #ff4d4d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
    }

    .features {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
    }

    .feature {
        display: flex;
        align-items: center;
        gap: 16px;
        background: var(--bg-secondary);
        padding: 16px;
        border-radius: 16px;
        border: 1px solid var(--border);
    }

    .icon-box {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .icon-box.red {
        background: #ff0000;
    }
    .icon-box.blue {
        background: #2196f3;
    }
    .icon-box.purple {
        background: #9c27b0;
    }

    .enter-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #ff0000;
        color: white;
        padding: 16px 32px;
        border-radius: 32px;
        font-size: 18px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition:
            transform 0.2s,
            background 0.2s;
        width: 100%;
        justify-content: center;
    }

    .enter-btn:hover {
        background: #cc0000;
        transform: scale(1.02);
    }
</style>
