if (request.action === "alert") {
    chrome.notifications.create({
      type: "basic",
      title: "Scam Website Alert",
      message: "Caution!!! ",
    });
    var audio = new Audio("alert.mp3");
    audio.play();
  }