    // Minimaler SCORM Wrapper für SCORM 1.2
    const SCORM = (function () {
      let API = null;
      let initialized = false;

      function findAPI(win) {
        while (win) {
          if (win.API) return win.API;
          if (win.parent === win) break;
          win = win.parent;
        }
        return null;
      }

      return {
        init: function () {
          API = findAPI(window);
          if (!API) return false;
          const result = API.LMSInitialize("");
          initialized = (result === "true");
          return initialized;
        },
        setScore: function (score) {
          if (!initialized) return false;
          const res = API.LMSSetValue("cmi.core.score.raw", score.toString());
          if (res === "true") {
            API.LMSCommit("");
            return true;
          }
          return false;
        },
        setCompleted: function () {
          if (!initialized) return false;
          const res = API.LMSSetValue("cmi.core.lesson_status", "completed");
          if (res === "true") {
            API.LMSCommit("");
            return true;
          }
          return false;
        },
        finish: function () {
          if (!initialized) return false;
          const res = API.LMSFinish("");
          initialized = false;
          return (res === "true");
        }
      };
    })();