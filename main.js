// ScriptExtract - Main JavaScript Functionality
// Handles URL validation, mock extraction, copy functionality, and visual effects

class ScriptExtract {
    constructor() {
        this.isExtracting = false;
        this.currentTranscript = '';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeParticleBackground();
        this.initializeStatistics();
    }

    setupEventListeners() {
        // URL input validation
        const urlInput = document.getElementById('youtubeUrl');
        if (urlInput) {
            urlInput.addEventListener('input', (e) => this.validateURL(e.target.value));
            urlInput.addEventListener('paste', (e) => setTimeout(() => this.validateURL(e.target.value), 100));
        }

        // Extract button
        const extractBtn = document.getElementById('extractBtn');
        if (extractBtn) {
            extractBtn.addEventListener('click', () => this.startExtraction());
        }

        // Copy buttons
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyTranscript());
        }

        const copyWithTimestamps = document.getElementById('copyWithTimestamps');
        if (copyWithTimestamps) {
            copyWithTimestamps.addEventListener('click', () => this.copyWithTimestamps());
        }

        // Export buttons
        const exportTxt = document.getElementById('exportTxt');
        if (exportTxt) {
            exportTxt.addEventListener('click', () => this.exportAsTXT());
        }

        const exportSrt = document.getElementById('exportSrt');
        if (exportSrt) {
            exportSrt.addEventListener('click', () => this.exportAsSRT());
        }

        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.toggleSearch());
        }

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchInTranscript(e.target.value));
        }
    }

    validateURL(url) {
        const urlInput = document.getElementById('youtubeUrl');
        const urlStatus = document.getElementById('urlStatus');
        const extractBtn = document.getElementById('extractBtn');
        const videoPreview = document.getElementById('videoPreview');

        // YouTube URL patterns
        const patterns = [
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
            /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/,
            /^https?:\/\/(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
            /^https?:\/\/m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/
        ];

        let isValid = false;
        let videoId = null;

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                isValid = true;
                videoId = match[2] || match[1];
                break;
            }
        }

        if (url.length === 0) {
            urlStatus.innerHTML = '';
            extractBtn.disabled = true;
            videoPreview.classList.add('hidden');
        } else if (isValid) {
            urlStatus.innerHTML = '<span class="text-green-400 text-xl">✓</span>';
            extractBtn.disabled = false;
            this.showVideoPreview(videoId);
        } else {
            urlStatus.innerHTML = '<span class="text-red-400 text-xl">✗</span>';
            extractBtn.disabled = true;
            videoPreview.classList.add('hidden');
        }

        return isValid;
    }

    showVideoPreview(videoId) {
        const videoPreview = document.getElementById('videoPreview');
        videoPreview.innerHTML = `
            <div class="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="Video thumbnail" class="w-24 h-18 rounded object-cover">
                <div class="flex-1">
                    <p class="text-white font-semibold">Video detected</p>
                    <p class="text-gray-400 text-sm">Ready for transcript extraction</p>
                </div>
            </div>
        `;
        videoPreview.classList.remove('hidden');
    }

    async startExtraction() {
        if (this.isExtracting) return;

        this.isExtracting = true;
        const extractBtn = document.getElementById('extractBtn');
        const btnText = document.getElementById('btnText');
        const btnLoading = document.getElementById('btnLoading');
        const progressSection = document.getElementById('progressSection');
        const resultsSection = document.getElementById('resultsSection');

        // Update button state
        btnText.textContent = 'Extracting...';
        btnLoading.classList.remove('hidden');
        extractBtn.disabled = true;

        // Show progress section
        progressSection.classList.remove('hidden');

        // Simulate extraction process
        await this.simulateExtraction();

        // Hide progress and show results
        progressSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');

        // Reset button
        btnText.textContent = 'Extract Script';
        btnLoading.classList.add('hidden');
        extractBtn.disabled = false;

        this.isExtracting = false;
    }

    async simulateExtraction() {
        const progressBar = document.getElementById('progressBar');
        const progressPercent = document.getElementById('progressPercent');
        const progressStatus = document.getElementById('progressStatus');

        const steps = [
            { progress: 15, status: 'Analyzing video content...', delay: 800 },
            { progress: 35, status: 'Extracting audio track...', delay: 1200 },
            { progress: 55, status: 'Processing speech recognition...', delay: 1500 },
            { progress: 75, status: 'Generating transcript...', delay: 1000 },
            { progress: 90, status: 'Formatting output...', delay: 600 },
            { progress: 100, status: 'Extraction complete!', delay: 400 }
        ];

        for (const step of steps) {
            await this.delay(step.delay);
            progressBar.style.width = `${step.progress}%`;
            progressPercent.textContent = `${step.progress}%`;
            progressStatus.textContent = step.status;
        }

        // Generate mock transcript
        this.currentTranscript = this.generateMockTranscript();
        this.displayTranscript();
    }

    generateMockTranscript() {
        const transcripts = [
            `[00:00] Welcome to this comprehensive tutorial on machine learning fundamentals. In this video, we'll explore the basic concepts that every data scientist should understand before diving deeper into advanced algorithms.

[00:20] Machine learning is essentially teaching computers to learn patterns from data without being explicitly programmed for every possible scenario. This approach has revolutionized how we solve complex problems in various industries.

[00:45] The three main types of machine learning are supervised learning, unsupervised learning, and reinforcement learning. Each approach has its own strengths and applications depending on the problem you're trying to solve.

[01:10] Throughout this tutorial, we'll provide practical examples and real-world applications to help you understand these concepts better. We'll also discuss common pitfalls and best practices to follow when implementing machine learning solutions.

[01:35] Let's start with supervised learning, which is the most common type of machine learning. In supervised learning, we train our models using labeled data, which means each training example includes both the input and the desired output.

[02:00] Common supervised learning algorithms include linear regression for predicting continuous values, logistic regression for classification problems, and decision trees that can handle both regression and classification tasks.

[02:25] Unsupervised learning, on the other hand, works with unlabeled data. The algorithm must find patterns and structure in the data without being told what to look for. This is particularly useful for clustering similar items together or reducing the dimensionality of complex datasets.

[02:50] Reinforcement learning is perhaps the most exciting area of machine learning. Here, an agent learns to make decisions by interacting with an environment and receiving rewards or penalties for its actions. This approach has led to breakthroughs in game playing, robotics, and autonomous systems.

[03:15] The key to successful machine learning is understanding which approach to use for your specific problem. Consider factors like the type and amount of data you have, the complexity of the problem, and the computational resources available.

[03:40] Data preprocessing is often the most time-consuming part of any machine learning project. This includes cleaning the data, handling missing values, normalizing features, and splitting the data into training and testing sets.

[04:05] Model evaluation is crucial for understanding how well your algorithm is performing. Common metrics include accuracy, precision, recall, and F1-score for classification problems, and mean squared error or R-squared for regression tasks.

[04:30] Cross-validation is an important technique for assessing how your model will generalize to new data. It involves splitting your data into multiple folds and training/testing your model on different combinations of these folds.

[04:55] Overfitting is a common problem in machine learning where your model performs well on training data but poorly on new data. Regularization techniques like L1 and L2 regularization can help prevent overfitting.

[05:20] Feature engineering is the process of creating new features from existing data that might help your model perform better. This could involve combining features, creating polynomial features, or extracting information from text or dates.

[05:45] Hyperparameter tuning involves finding the optimal settings for your machine learning algorithm. Techniques like grid search, random search, and Bayesian optimization can help you find the best combination of hyperparameters.

[06:10] Ensemble methods combine multiple models to improve performance. Random forests and gradient boosting are popular ensemble techniques that often achieve state-of-the-art results on many problems.

[06:35] Deep learning has revolutionized many areas of machine learning, particularly in computer vision and natural language processing. Neural networks with many layers can learn complex patterns in data that would be difficult for traditional algorithms to capture.

[07:00] Convolutional neural networks are particularly effective for image-related tasks. They use convolutional layers to detect features like edges, shapes, and textures at different scales within an image.

[07:25] Recurrent neural networks and their variants like LSTMs are designed to work with sequential data. They're commonly used for tasks like language modeling, machine translation, and time series prediction.

[07:50] Transfer learning allows you to use pre-trained models on your own data, which can significantly reduce training time and improve performance, especially when you have limited data.

[08:15] The field of machine learning is constantly evolving, with new algorithms and techniques being developed regularly. Staying current with the latest research and best practices is essential for anyone working in this field.

[08:40] Ethical considerations are becoming increasingly important in machine learning. Issues like bias in algorithms, privacy concerns, and the societal impact of automation need to be carefully considered when developing and deploying machine learning systems.

[09:05] Interpretability and explainability are crucial for building trust in machine learning models. Techniques like LIME and SHAP can help explain why a model made a particular prediction, which is especially important in high-stakes applications.

[09:30] MLOps, or machine learning operations, focuses on the practical aspects of deploying and maintaining machine learning systems in production. This includes model versioning, monitoring, and continuous integration/continuous deployment practices.

[09:55] The future of machine learning looks incredibly promising, with advances in areas like few-shot learning, federated learning, and quantum machine learning opening up new possibilities for solving complex problems.

[10:20] Thank you for watching this tutorial. I hope you found it helpful in understanding the fundamentals of machine learning. Don't forget to subscribe for more educational content, and feel free to leave any questions in the comments below.`
        ];

        return transcripts[Math.floor(Math.random() * transcripts.length)];
    }

    displayTranscript() {
        const transcriptArea = document.getElementById('transcriptArea');
        transcriptArea.innerHTML = this.formatTranscript(this.currentTranscript);
    }

    formatTranscript(transcript) {
        // Format timestamps and add styling
        return transcript
            .replace(/\[([0-9:]+)\]/g, '<span class="timestamp">[$1]</span>')
            .replace(/\n/g, '<br>');
    }

    async copyTranscript() {
        const plainText = this.currentTranscript.replace(/\[([0-9:]+)\]/g, '').replace(/\n/g, ' ');
        await this.copyToClipboard(plainText, 'Full transcript copied to clipboard!');
    }

    async copyWithTimestamps() {
        await this.copyToClipboard(this.currentTranscript, 'Transcript with timestamps copied!');
    }

    async copyToClipboard(text, successMessage) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification(successMessage, 'success');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showNotification('Failed to copy text. Please try again.', 'error');
        }
    }

    exportAsTXT() {
        const plainText = this.currentTranscript.replace(/\[([0-9:]+)\]/g, '').replace(/\n/g, '\r\n');
        const blob = new Blob([plainText], { type: 'text/plain' });
        this.downloadFile(blob, 'transcript.txt');
        this.showNotification('TXT file downloaded!', 'success');
    }

    exportAsSRT() {
        const srtContent = this.convertToSRT(this.currentTranscript);
        const blob = new Blob([srtContent], { type: 'text/plain' });
        this.downloadFile(blob, 'transcript.srt');
        this.showNotification('SRT file downloaded!', 'success');
    }

    convertToSRT(transcript) {
        const lines = transcript.split('\n').filter(line => line.trim());
        let srtContent = '';
        let subtitleIndex = 1;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const timestampMatch = line.match(/\[([0-9:]+)\]/);
            
            if (timestampMatch) {
                const startTime = this.convertToSRTTime(timestampMatch[1]);
                const endTime = this.convertToSRTTime(this.getNextTimestamp(lines, i) || '00:00');
                const text = line.replace(/\[([0-9:]+)\]/, '').trim();

                if (text) {
                    srtContent += `${subtitleIndex}\n`;
                    srtContent += `${startTime} --> ${endTime}\n`;
                    srtContent += `${text}\n\n`;
                    subtitleIndex++;
                }
            }
        }

        return srtContent;
    }

    convertToSRTTime(timestamp) {
        const parts = timestamp.split(':');
        if (parts.length === 2) {
            const minutes = parseInt(parts[0]);
            const seconds = parseInt(parts[1]);
            return `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},000`;
        }
        return '00:00:00,000';
    }

    getNextTimestamp(lines, currentIndex) {
        for (let i = currentIndex + 1; i < lines.length; i++) {
            const match = lines[i].match(/\[([0-9:]+)\]/);
            if (match) return match[1];
        }
        return null;
    }

    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    toggleSearch() {
        const searchBox = document.getElementById('searchBox');
        const searchInput = document.getElementById('searchInput');
        
        if (searchBox.classList.contains('hidden')) {
            searchBox.classList.remove('hidden');
            searchInput.focus();
        } else {
            searchBox.classList.add('hidden');
            searchInput.value = '';
            this.clearSearchHighlights();
        }
    }

    searchInTranscript(query) {
        if (!query) {
            this.clearSearchHighlights();
            return;
        }

        const transcriptArea = document.getElementById('transcriptArea');
        const content = transcriptArea.innerHTML;
        
        // Clear previous highlights
        const cleanContent = content.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
        
        // Add new highlights
        const regex = new RegExp(`(${query})`, 'gi');
        const highlightedContent = cleanContent.replace(regex, '<mark class="search-highlight bg-yellow-400 text-black">$1</mark>');
        
        transcriptArea.innerHTML = highlightedContent;
    }

    clearSearchHighlights() {
        const transcriptArea = document.getElementById('transcriptArea');
        const content = transcriptArea.innerHTML;
        const cleanContent = content.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
        transcriptArea.innerHTML = cleanContent;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Visual effects and animations
    initializeAnimations() {
        // Fade in animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Animate statistics counters
        this.animateCounters();
    }

    animateCounters() {
        const counters = [
            { id: 'statVideos', target: 125847, duration: 2000 },
            { id: 'statAccuracy', target: 99.2, duration: 1500, suffix: '%' },
            { id: 'statUsers', target: 45321, duration: 1800 },
            { id: 'statTime', target: 45, duration: 1200, suffix: 's' }
        ];

        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (element) {
                this.animateCounter(element, counter.target, counter.duration, counter.suffix);
            }
        });
    }

    animateCounter(element, target, duration, suffix = '') {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            
            const displayValue = suffix === '%' ? start.toFixed(1) : Math.floor(start).toLocaleString();
            element.textContent = displayValue + suffix;
        }, 16);
    }

    initializeParticleBackground() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        // p5.js sketch for particle background
        const sketch = (p) => {
            let particles = [];
            const numParticles = 50;

            p.setup = () => {
                p.createCanvas(canvas.offsetWidth, canvas.offsetHeight);
                
                // Create particles
                for (let i = 0; i < numParticles; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6),
                        opacity: p.random(0.1, 0.3)
                    });
                }
            };

            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(0, 102, 255, particle.opacity * 255);
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                });
                
                // Draw connections
                particles.forEach((particle, i) => {
                    particles.slice(i + 1).forEach(other => {
                        const distance = p.dist(particle.x, particle.y, other.x, other.y);
                        if (distance < 100) {
                            p.stroke(0, 102, 255, (1 - distance / 100) * 50);
                            p.strokeWeight(1);
                            p.line(particle.x, particle.y, other.x, other.y);
                        }
                    });
                });
            };

            p.windowResized = () => {
                p.resizeCanvas(canvas.offsetWidth, canvas.offsetHeight);
            };
        };

        new p5(sketch, canvas);
    }

    initializeStatistics() {
        // Initialize ECharts for statistics if on about page
        const chartDom = document.getElementById('missionChart');
        if (chartDom && typeof echarts !== 'undefined') {
            const myChart = echarts.init(chartDom);
            
            const option = {
                backgroundColor: 'transparent',
                title: {
                    text: 'Transcript Accuracy by Language',
                    textStyle: {
                        color: '#f3f4f6',
                        fontSize: 18
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    textStyle: {
                        color: '#f3f4f6'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'],
                    axisLabel: {
                        color: '#9ca3af'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#374151'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    min: 95,
                    max: 100,
                    axisLabel: {
                        color: '#9ca3af',
                        formatter: '{value}%'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#374151'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#374151'
                        }
                    }
                },
                series: [{
                    data: [99.2, 98.7, 98.9, 99.1, 97.8, 98.3],
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#0066ff' },
                            { offset: 1, color: '#00ccff' }
                        ])
                    },
                    barWidth: '60%'
                }]
            };

            myChart.setOption(option);
            
            // Resize chart on window resize
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScriptExtract();
});

// Handle page-specific functionality
if (window.location.pathname.includes('help.html')) {
    // FAQ functionality for help page
    window.toggleFAQ = function(element) {
        const content = element.nextElementSibling;
        const icon = element.querySelector('span');
        
        if (content.classList.contains('active')) {
            content.classList.remove('active');
            icon.textContent = '+';
        } else {
            // Close all other FAQs
            document.querySelectorAll('.faq-content.active').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.faq-item span').forEach(item => {
                item.textContent = '+';
            });
            
            // Open clicked FAQ
            content.classList.add('active');
            icon.textContent = '−';
        }
    };

    // Search functionality for help page
    document.getElementById('helpSearch')?.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const keywords = item.dataset.keywords.toLowerCase();
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('.faq-content p').textContent.toLowerCase();
            
            if (searchTerm === '' || keywords.includes(searchTerm) || title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}