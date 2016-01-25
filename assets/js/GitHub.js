var GitHub = {
	target: null,
	username: null,

	// Get GitHub Userdata
	getUser: function (callback) {
		var script = document.createElement('script');
		script.src = 'https://api.github.com/users/' + this.username + '/repos?per_page=100&callback=GitHub.renderRepos';

		document.querySelector('head').appendChild(script);
	},

	// Render Repositories
	renderRepos: function (data) {
		var self = this;
		var repos = data.data;
		var list = [];

		// Sorting...
		self.sortByForks(repos);

		// Clear Target
		self.target.innerHTML = "";

		// Repos Data
		if (repos.length >= 1) {

			// Loop through Repos
			repos.forEach(function (repo, index, array) {
				var has_forks = repo.fork;

				// Check for {username}.github.io
				if ((repo.name != (self.username.toLowerCase() + '.github.io')) && has_forks != true) {
					var repo_url = repo.homepage ? repo.homepage : repo.html_url;

					list.push([
						'<a href="' + repo_url + '" class="repo" target="_blank">',
						'	<h1 class="repo__title">' + repo.name + (repo.language ? ' <small>' + repo.language + '</small>' : '') + '</h1>',
						'	<div class="repo__content">',
						'		<p class="repo__description">' + repo.description + '</p>',
						'		<div class="separator"></div>',
						'		<div class="repo__footer">',
						'			<p class="repo__data"><i class="icon ion-fork"></i> ' + repo.forks_count + '</p>',
						'			<p class="repo__data"><i class="icon ion-eye"></i> ' + repo.watchers_count + '</p>',
						'			<p class="repo__data"><i class="icon ion-star"></i> ' + repo.stargazers_count + '</p>',
						'		</div>',
						'	</div>',
						'</a>'
					].join("\n"));
				}
			});

			// Show Data
			self.target.innerHTML = list.join("\n");
		}
	},

	// Get GitHub Repositories
	getRepos: function () {
		var self = this;

		// Get Userdata
		self.getUser(GitHub.renderRepos);
	},

	// Show Loading in Target
	showLoading: function () {
		this.target.innerHTML = [
			'<div class="spinner">',
  			'	<div class="rect1"></div>',
  			'	<div class="rect2"></div>',
  			'	<div class="rect3"></div>',
  			'	<div class="rect4"></div>',
  			'	<div class="rect5"></div>',
			'</div>'
		].join("\n");
	},

	// Show GitHub Repositories
	showRepos: function (target, username) {
		this.target = document.querySelector(target);
		this.username = username;

		// Show Loader...
		this.showLoading();

		// Show Userdata...
		this.getRepos();
	},

	// Sort by Forks
	sortByForks: function (repos) {
		repos.sort(function (a, b) {
			return b.forks - a.forks;
		});
	}
};
