selector_to_html = {"a[href=\"board_overview.html\"]": "<h1 class=\"tippy-header\" id=\"board-overview\" style=\"margin-top: 0;\">Board overview<a class=\"headerlink\" href=\"#board-overview\" title=\"Link to this heading\">\u00b6</a></h1><p>The STM32H7 Renode Reference Platform is an open hardware board implementing the <code class=\"docutils literal notranslate\"><span class=\"pre\">STM32H7</span></code> MCU family. The board design files were created in KiCad 9.x. A digital twin of the board is represented in the Renode simulation framework, allowing users to experiment with and learn how to integrate Renode into the development process.</p><p>You can find out more by visiting the portals listed below:</p>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(` ${select}`);
        for (const link of links) {
            if (skip_classes.some(c => link.classList.contains(c))) {
                continue;
            }

            tippy(link, {
                content: tip_html,
                allowHTML: true,
                arrow: true,
                placement: 'top-start', maxWidth: 1200, interactive: false, duration: [200, 100], delay: [200, 500],

            });
        };
    };
    console.log("tippy tips loaded!");
};
