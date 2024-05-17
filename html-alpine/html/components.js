const header = `
<header class="navbar bg-base-100">
    <a class="btn btn-ghost text-xl">BG3 character build tool</a>
</header>
`;

const footer = `
<footer class="footer p-10 bg-base-200 text-base-content">
    <aside>
        <img src="./BaldursGateIIILogo.png" width="50" alt="BG3 Logo" />
    </aside>
    <nav>
        <h6 class="footer-title">此项目</h6>
        <a class="link link-hover">Code by ovaphlow</a>
    </nav>
    <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
    </nav>
    <nav>
        <h6 class="footer-title">Legal</h6>
        <a class="link link-hover">Terms of use</a>
    </nav>
</footer>
`;

document.addEventListener("alpine:init", () => {
    Alpine.data("components", () => ({
        header: header,
        footer: footer,
    }));
});
