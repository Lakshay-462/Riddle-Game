const a = document.getElementById("hiddenText");
document.getElementById("b1").addEventListener("click", async () => {
    try {
        const response = await fetch('/riddle-answer');

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        let result = '';
        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = streamDone;

            if (value) {
                result += decoder.decode(value, { stream: true });
            }
        }
        a.style.visibility = "visible";
        document.getElementById("b2").style.display = "inline-block";
        document.getElementById("hiddenText").innerHTML = result;
    } catch (error) {
        console.log(error);
    }
});

document.getElementById("b2").addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/next_riddle", true);

    xhr.onload = function() {
        if(xhr.status >= 200 && xhr.status < 300){
            const reply = JSON.parse(xhr.responseText);
            document.getElementById("Show_riddle").innerHTML = `${reply.riddle}`;
            a.style.visibility = "hidden";
            document.getElementById("b2").style.display = "none";
        }else{
            console.log("request failed. status: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.log("Request failed.");
    }

    xhr.send();
});