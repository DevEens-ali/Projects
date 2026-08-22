async function loadComponent(
    componentPath,
    targetSelector
) {

    try {

        const response =
            await fetch(componentPath);

        if (!response.ok) {
            throw new Error(
                `Failed to load component: ${componentPath}`
            );
        }

        const html =
            await response.text();

        const target =
            document.querySelector(targetSelector);

        if (!target) {
            throw new Error(
                `Target element not found: ${targetSelector}`
            );
        }

        target.innerHTML = html;

        return true;

    } catch (error) {

        console.error(
            "Component loading error:",
            error
        );

        return false;
    }
}