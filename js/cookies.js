;(function(namespace, undefined){
	namespace.cookie = (function () {

		function createCookie(name,value,days) {
		    if (days) {
		        var date = new Date();
		        date.setTime(date.getTime() + (days*24*60*60*1000));
		        var expires = "; expires=" + date.toUTCString();
		    }
		    else var expires = "";
		    document.cookie = name + "=" + value + expires + "; path=/";
		};

		function readCookie(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1,c.length);
		        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		    }
		    return null;
		};

		function eraseCookie(name) {
		    createCookie(name,"",-1);
		};

		function getHighScoreText(){
			//TODO: return the whole high score text as a string
		}

		function addScoreToHighScores(level, time){
			//TODO: slot the new score into the right position in the cookie
		};

		function checkScoreAgainstHighScores(level, startTime){
			if (readCookie("freeElectronScores").length) {
				//TODO: work out if this run belongs in the high score table
			} else {
				//createCookie("freeElectronScores",JSON.stringify( xxx your first high score here xxx ),90)
			};
		};

		return {
			create: createCookie,
			read: readCookie,
			erase: eraseCookie,
			checkScoreAgainstHighScores: checkScoreAgainstHighScores,
			getScore: getHighScoreText
		};

	})();
})(window.freeElectron = window.freeElectron || {});