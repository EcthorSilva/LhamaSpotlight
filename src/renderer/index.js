document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("input");
    const responseContainer = document.querySelector("samp");

    input.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            const query = input.value.trim();
            if (query) {
                responseContainer.textContent = "Pensando...";
                try {
                    const response = await fetch("http://localhost:11434/api/generate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            model: "llama3.2:latest",
                            prompt: query,
                            stream: true,
                            temperature: 0.3,
                            system: "Você é um buscador semelhante ao Spotlight do macOS chamado LhamaSpotlight",
                            context: []
                        })
                    });

                    if (!response.ok) {
                        throw new Error("Erro ao buscar os dados");
                    }

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let fullResponse = "";

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        chunk.split("\n").forEach((line) => {
                            if (line.trim()) {
                                try {
                                    const parsed = JSON.parse(line);
                                    if (parsed.response) {
                                        fullResponse += parsed.response;
                                        responseContainer.textContent = fullResponse; // Atualiza a resposta em tempo real
                                    }
                                } catch (e) {
                                    console.error("Erro ao processar chunk:", e);
                                }
                            }
                        });
                    }
                } catch (error) {
                    responseContainer.textContent = "Erro ao buscar resposta.";
                    console.error(error);
                }
            }
        }
    });
});

console.log("LhamaSpotlight iniciado com sucesso!");
