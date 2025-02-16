export default class MyFunWords extends HTMLElement {
	constructor() {
		super()

		// Attach shadow DOM
		this.attachShadow({ mode: 'open' })

		// Define words
		this.words = [
			'Science',
			'Math',
			'English',
			'History',
			'Bible',
			'SocialScience',
			'ForeignLanguage',
			'Technology',
			'Art',
		]

		this.currentIndex = 0
		this.interval = this.getAttribute('interval') || 3000 // Allow customization

		this.shadowRoot.innerHTML = `
                    <style>
                        .container {
                            font-size: 2rem;
                            font-weight: bold;
                            display: inline-flex;
                            align-items: center;
                            position: relative;
                        }
                        .word-wrapper {
                            position: relative;
                            width: 15ch;
                            height: 1.2em;
                            overflow: hidden;
                            display: inline-block;
                        }
                        .word {
                            position: absolute;
                            left: 0;
                            width: 100%;
                            text-align: left;
														color: #307ad5;
                            transition: transform 0.5s ease-in-out;
                        }
                    </style>
                    <div class="container">
                        MyFun <span class="word-wrapper">
                            <span class="word">${this.words[0]}</span>
                        </span>
                    </div>
                `
	}

	connectedCallback() {
		this.startAnimation()
	}

	startAnimation() {
		this.timer = setInterval(() => this.swapWords(), this.interval)
	}

	swapWords() {
		const wrapper = this.shadowRoot.querySelector('.word-wrapper')
		const currentWord = this.shadowRoot.querySelector('.word')

		// Create new word element
		const newWord = document.createElement('span')
		newWord.classList.add('word')
		newWord.textContent = this.words[(this.currentIndex + 1) % this.words.length]
		newWord.style.transform = 'translateY(100%)'
		newWord.style.opacity = '0'
		wrapper.appendChild(newWord)

		// Animate transition
		setTimeout(() => {
			currentWord.style.transform = 'translateY(-100%)'
			// currentWord.style.opacity = '0'
			newWord.style.transform = 'translateY(0)'
			newWord.style.opacity = '1'
		}, 100)

		// Remove old word after animation
		setTimeout(() => {
			currentWord.remove()
		}, 500)

		this.currentIndex = (this.currentIndex + 1) % this.words.length
	}

	disconnectedCallback() {
		clearInterval(this.timer)
	}
}

customElements.define('myfun-words', MyFunWords)
