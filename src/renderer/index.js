const input = document.getElementById("search");

input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        const query = input.value.trim();
        if (query) {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: "llama3", prompt: query })
            });
            const data = await response.json();
            alert(data.response); // Melhorar exibição depois
        }
    }
});
