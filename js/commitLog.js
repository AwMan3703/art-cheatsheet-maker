
const commitLogList = document.getElementById('commit-log-list')
const commitLogListElementTemplate = document.getElementById('commit-log-list-element-template')

function addCommitLogElement(commit) {
	const commitDate = new Date(commit.commit.author.date)
	commit.sha_id = commit.sha.slice(0,7)

	const e = compileHTMLTemplate(commitLogListElementTemplate, {
		'.author-username' : commit.commit.author.name,
		'.commit-sha-id' : commit.sha_id,
		'.commit-description' : commit.commit.message,
		'.commit-date' : `${commitDate.getDate()}/${commitDate.getMonth()+1}/${commitDate.getFullYear()}`,
		'.commit-time' : `${commitDate.getHours()}:${commitDate.getMinutes()}:${commitDate.getSeconds()}`,
		'.commit-sha' : commit.sha
	}, {
		'.author-pfp' : {'src':commit.author.avatar_url},
		'.author-username' : {'title':commit.author.login, 'href':commit.author.html_url},
		'.commit-html-url' : {'href':commit.html_url}
	})

	commitLogList.appendChild(e)
}


fetch('https://api.github.com/repos/AwMan3703/art-cheatsheet-maker/commits')
	.then(res => {
		if (!res.ok) {
			const errMessage = document.getElementById('error-message')
			errMessage.innerText = `Error fetching commit list: ${res.status} ${res.statusText} - ${JSON.stringify(res)}`
			errMessage.style.display = 'unset'
		}
		res.json().then(commits => {
			for (const commit of commits) {
				addCommitLogElement(commit)
			}
		})
	})