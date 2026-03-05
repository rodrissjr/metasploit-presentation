
        // METEORS
        function createMeteor() {
            const meteor = document.createElement('div');
            meteor.classList.add('meteor');
            
            const startX = Math.random() * 90 + 5;
            const startY = Math.random() * 90 + 5;
            const baseAngle = (Math.random() * 150) - 75;
            const rad = baseAngle * Math.PI / 180;
            const distance = 400 + Math.random() * 600;
            const moveX = Math.cos(rad) * distance;
            const moveY = Math.sin(rad) * distance;
            
            meteor.style.left = startX + '%';
            meteor.style.top = startY + '%';
            meteor.style.setProperty('--moveX', moveX + 'px');
            meteor.style.setProperty('--moveY', moveY + 'px');
            meteor.style.setProperty('--angle', baseAngle + 'deg');
            
            const length = 60 + Math.random() * 80;
            const width = 1 + Math.random() * 2;
            
            meteor.style.width = length + 'px';
            meteor.style.height = width + 'px';
            
            const duration = 0.5 + Math.random() * 1;
            meteor.style.animationDuration = duration + 's';
            
            const delay = Math.random() * 2;
            meteor.style.animationDelay = delay + 's';
            
            document.getElementById('meteorContainer').appendChild(meteor);
            
            setTimeout(() => {
                if (meteor.parentNode) {
                    meteor.remove();
                }
            }, (duration + delay + 0.5) * 1000);
        }

        function startMeteorShower() {
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    createMeteor();
                }, i * 60);
            }
            
            setInterval(() => {
                const count = Math.floor(Math.random() * 5) + 3;
                for (let i = 0; i < count; i++) {
                    setTimeout(() => {
                        createMeteor();
                    }, i * 50);
                }
            }, 350);
        }

        startMeteorShower();

        // Star twinkling
        setInterval(() => {
            document.querySelectorAll('.star').forEach(star => {
                star.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
            });
        }, 800);

        // Click effect on stars
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function(e) {
                e.stopPropagation();
                const info = this.getAttribute('data-info');
                
                const terminal = document.createElement('div');
                terminal.style.position = 'fixed';
                terminal.style.top = '50%';
                terminal.style.left = '50%';
                terminal.style.transform = 'translate(-50%, -50%)';
                terminal.style.background = 'rgba(0, 8, 0, 0.98)';
                terminal.style.border = '1px solid #0f0';
                terminal.style.padding = '20px';
                terminal.style.color = '#0f0';
                terminal.style.fontFamily = 'Courier New';
                terminal.style.zIndex = '10000';
                terminal.style.boxShadow = '0 0 50px #0f0';
                terminal.style.fontSize = '12px';
                terminal.style.minWidth = '350px';
                terminal.innerHTML = `
                    <pre>
══════════════════════════
MODULE: ${info}
══════════════════════════

msf6 > use ${info}
msf6 > set RHOSTS 192.168.1.100
msf6 > exploit

[*] Session opened
                    </pre>
                    <p style="color: #0f0; font-size: 10px;">[click to close]</p>
                `;
                
                document.body.appendChild(terminal);
                
                setTimeout(() => {
                    document.addEventListener('click', function close() {
                        terminal.remove();
                        document.removeEventListener('click', close);
                    }, { once: true });
                }, 100);
            });
        });

        // Core planet click
        document.getElementById('core').addEventListener('click', function() {
            const terminal = document.createElement('div');
            terminal.style.position = 'fixed';
            terminal.style.top = '50%';
            terminal.style.left = '50%';
            terminal.style.transform = 'translate(-50%, -50%)';
            terminal.style.background = 'rgba(10, 0, 0, 0.98)';
            terminal.style.border = '1px solid #f50';
            terminal.style.padding = '30px';
            terminal.style.color = '#f50';
            terminal.style.fontFamily = 'Courier New';
            terminal.style.zIndex = '10000';
            terminal.style.boxShadow = '0 0 100px #f50';
            terminal.style.fontSize = '14px';
            terminal.innerHTML = `
                <pre>
    ╔══════════════════════╗
    ║   METASPLOIT CORE   ║
    ╚══════════════════════╝
    
    Version: 6.3.25
    Exploits: 2147
    Payloads: 592
    
    msf6 >
                </pre>
                <p style="font-size: 10px;">click to close</p>
            `;
            
            document.body.appendChild(terminal);
            
            document.addEventListener('click', function close() {
                terminal.remove();
                document.removeEventListener('click', close);
            }, { once: true });
        });

        // END BUTTON FUNCTIONALITY
        document.getElementById('endButton').addEventListener('click', function() {
            // Create end message modal
            const modal = document.createElement('div');
            modal.className = 'end-modal';
            modal.innerHTML = `
                <div class="end-content">
                    <pre>
╔══════════════════════════════════════╗
║         PRESENTATION COMPLETE        ║
╚══════════════════════════════════════╝

    ███████╗███╗   ██╗██████╗ 
    ██╔════╝████╗  ██║██╔══██╗
    █████╗  ██╔██╗ ██║██║  ██║
    ██╔══╝  ██║╚██╗██║██║  ██║
    ███████╗██║ ╚████║██████╔╝
    ╚══════╝╚═╝  ╚═══╝╚═════╝ 
                    </pre>
                    
                    <div class="joke">
                        > "Now you think you can hack anything with Metasploit?" <
                    </div>
                    
                    <pre style="color: #ffaa00; font-size: 14px;">
    ┌──(root㉿kali)-[~]
    └─# msfconsole
    msf6 > use exploit/windows/smb/ms17_010_eternalblue
    msf6 > set RHOSTS 192.168.1.100
    msf6 > exploit
    
    [-] Exploit failed: You need to study more! 😜
                    </pre>
                    
                    <div class="small-text">
                        [ JUST KIDDING! Thanks for watching! ]
                    </div>
                    
                    <button id="closeEndModal">[ close ]</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close button functionality
            document.getElementById('closeEndModal').addEventListener('click', function() {
                modal.remove();
            });
            
            // Also close when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    