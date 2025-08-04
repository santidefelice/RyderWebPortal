let roleProfiles = [];
let assignments = [];

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            loadSampleData();
            renderProfiles();
            updateRoleSelect();
            setupEventListeners();
        });

        function loadSampleData() {
            // Add some sample role profiles for demonstration
            roleProfiles = [
                {
                    id: 1,
                    roleName: 'UI/UX Team',
                    department: 'design',
                    priority: 'high',
                    status: 'active',
                    requiredSkills: 'Figma, Adobe XD, React, CSS, User Research',
                    teamLead: 'Sarah Johnson',
                    description: 'A collaborative team focused on creating intuitive and beautiful user interfaces. We work closely with product and engineering teams to deliver exceptional user experiences.',
                    expectations: 'Design and prototype user interfaces, conduct user research, maintain design systems, collaborate with developers on implementation.'
                },
                {
                    id: 2,
                    roleName: 'Backend API Team',
                    department: 'engineering',
                    priority: 'high',
                    status: 'recruiting',
                    requiredSkills: 'Node.js, Python, PostgreSQL, Docker, AWS',
                    teamLead: 'Mike Chen',
                    description: 'Responsible for building and maintaining scalable backend services and APIs. This team ensures our systems can handle growth and provide reliable service to our users.',
                    expectations: 'Develop REST APIs, optimize database performance, implement security best practices, monitor system health and performance.'
                },
                {
                    id: 3,
                    roleName: 'Marketing Analytics',
                    department: 'marketing',
                    priority: 'medium',
                    status: 'filled',
                    requiredSkills: 'Google Analytics, SQL, Python, Tableau, A/B Testing',
                    teamLead: 'Jessica Williams',
                    description: 'Data-driven marketing team that analyzes user behavior, campaign performance, and market trends to optimize our marketing strategies.',
                    expectations: 'Track marketing KPIs, run A/B tests, create performance dashboards, provide insights for campaign optimization.'
                }
            ];

            assignments = [
                {
                    roleId: 1,
                    personName: 'Alex Rivera',
                    personEmail: 'alex.rivera@company.com',
                    roleType: 'lead',
                    startDate: '2024-01-15',
                    personSkills: 'Figma, React, User Research, Design Systems',
                    notes: 'Lead designer with 5 years experience'
                },
                {
                    roleId: 1,
                    personName: 'Taylor Kim',
                    personEmail: 'taylor.kim@company.com',
                    roleType: 'member',
                    startDate: '2024-02-01',
                    personSkills: 'Adobe XD, CSS, Prototyping',
                    notes: 'Strong in visual design and prototyping'
                },
                {
                    roleId: 2,
                    personName: 'Jordan Smith',
                    personEmail: 'jordan.smith@company.com',
                    roleType: 'senior',
                    startDate: '2024-01-10',
                    personSkills: 'Node.js, PostgreSQL, Docker, AWS',
                    notes: 'Senior backend engineer with cloud expertise'
                },
                {
                    roleId: 3,
                    personName: 'Sam Davis',
                    personEmail: 'sam.davis@company.com',
                    roleType: 'member',
                    startDate: '2024-01-20',
                    personSkills: 'Google Analytics, SQL, Tableau',
                    notes: 'Analytics specialist with strong SQL skills'
                }
            ];
        }

        function setupEventListeners() {
            // Profile form submission
            document.getElementById('profile-form').addEventListener('submit', function(e) {
                e.preventDefault();
                createRoleProfile();
            });

            // Assignment form submission
            document.getElementById('assignment-form').addEventListener('submit', function(e) {
                e.preventDefault();
                createAssignment();
            });

            // Search functionality
            document.getElementById('searchProfiles').addEventListener('input', function(e) {
                filterProfiles(e.target.value);
            });

            // Set default date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('startDate').value = today;
        }

        function switchTab(tabName) {
            // Update nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');

            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName + '-tab').classList.add('active');

            // Update role select when switching to assign tab
            if (tabName === 'assign') {
                updateRoleSelect();
            }
        }

        function createRoleProfile() {
            const formData = new FormData(document.getElementById('profile-form'));
            const profile = {
                id: Date.now(),
                roleName: formData.get('roleName'),
                department: formData.get('department'),
                priority: formData.get('priority'),
                status: formData.get('status'),
                requiredSkills: formData.get('requiredSkills'),
                teamLead: formData.get('teamLead'),
                description: formData.get('description'),
                expectations: formData.get('expectations')
            };

            roleProfiles.push(profile);
            
            // Reset form
            document.getElementById('profile-form').reset();
            
            // Show success message
            showSuccessMessage('create-success');
            
            // Update views
            renderProfiles();
            updateRoleSelect();
        }

        function createAssignment() {
            const formData = new FormData(document.getElementById('assignment-form'));
            const assignment = {
                roleId: parseInt(formData.get('selectRole')),
                personName: formData.get('personName'),
                personEmail: formData.get('personEmail'),
                roleType: formData.get('roleType'),
                startDate: formData.get('startDate'),
                personSkills: formData.get('personSkills'),
                notes: formData.get('assignmentNotes')
            };

            assignments.push(assignment);
            
            // Reset form
            document.getElementById('assignment-form').reset();
            document.getElementById('startDate').value = new Date().toISOString().split('T')[0];
            
            // Show success message
            showSuccessMessage('assign-success');
            
            // Update profiles view
            renderProfiles();
        }

        function updateRoleSelect() {
            const select = document.getElementById('selectRole');
            select.innerHTML = '<option value="">Choose a role profile</option>';
            
            roleProfiles.forEach(profile => {
                const option = document.createElement('option');
                option.value = profile.id;
                option.textContent = `${profile.roleName} - ${formatDepartment(profile.department)}`;
                select.appendChild(option);
            });
        }

        function renderProfiles() {
            const container = document.getElementById('profiles-container');
            
            if (roleProfiles.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <h3>No Role Profiles Yet</h3>
                        <p>Create your first role profile to get started!</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = roleProfiles.map(profile => {
    const profileAssignments = assignments.filter(a => a.roleId === profile.id);
    const icon = getIconForDepartment(profile.department);

    return `
        <div class="profile-card">
            <div class="profile-header">
                <div class="profile-icon">${icon}</div>
                <div class="profile-info">
                    <h3>${profile.roleName}</h3>
                    <p>${formatDepartment(profile.department)} • 
                       <span class="status-badge status-${profile.status}">${profile.status.toUpperCase()}</span>
                    </p>
                </div>
            </div>
            
            <div class="profile-details">
                <p><strong>Priority:</strong> ${profile.priority.toUpperCase()}</p>
                ${profile.teamLead ? `<p><strong>Team Lead:</strong> ${profile.teamLead}</p>` : ''}
                ${profile.requiredSkills ? `<p><strong>Required Skills:</strong> ${profile.requiredSkills}</p>` : ''}
                <p><strong>Description:</strong> ${profile.description.substring(0, 100)}${profile.description.length > 100 ? '...' : ''}</p>
            </div>

            <div class="profile-assignments">
                <h4>Team Members <span class="assignment-count">${profileAssignments.length}</span></h4>
                ${profileAssignments.length === 0 
                    ? `<p style="color: #6b7280; font-style: italic;">No team members assigned yet</p>`
                    : profileAssignments.map(a => `<p style="margin:0;"><strong>${a.personName}</strong> (${a.roleType})</p>`).join('')}
            </div>

            <div class="profile-actions">
                <button class="btn btn-secondary" onclick="viewRoleDetails(${profile.id})">
                    👁️ View Details
                </button>
                <button class="btn btn-success" onclick="quickAssign(${profile.id})">
                    👥 Quick Assign
                </button>
                <button class="btn btn-danger" onclick="deleteRoleProfile(${profile.id})">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `;
}).join('');
        }

        function filterProfiles(searchTerm) {
            const cards = document.querySelectorAll('.profile-card');
            const lowerSearch = searchTerm.toLowerCase();
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(lowerSearch)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function viewRoleDetails(profileId) {
            const profile = roleProfiles.find(p => p.id === profileId);
            const profileAssignments = assignments.filter(a => a.roleId === profileId);
            
            const modalContent = document.getElementById('assignment-details');
            modalContent.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <h4>${profile.roleName}</h4>
                    <p><strong>Department:</strong> ${formatDepartment(profile.department)}</p>
                    <p><strong>Priority:</strong> <span style="color: ${getPriorityColor(profile.priority)}">${profile.priority.toUpperCase()}</span></p>
                    <p><strong>Status:</strong> <span class="status-badge status-${profile.status}">${profile.status.toUpperCase()}</span></p>
                    ${profile.teamLead ? `<p><strong>Team Lead:</strong> ${profile.teamLead}</p>` : ''}
                    ${profile.requiredSkills ? `<p><strong>Required Skills:</strong> ${profile.requiredSkills}</p>` : ''}
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4>Description</h4>
                    <p style="line-height: 1.6;">${profile.description}</p>
                </div>
                
                ${profile.expectations ? `
                    <div style="margin-bottom: 20px;">
                        <h4>Expectations & Goals</h4>
                        <p style="line-height: 1.6;">${profile.expectations}</p>
                    </div>
                ` : ''}
                
                <h4 style="margin-top: 25px;">Team Members (${profileAssignments.length})</h4>
                ${profileAssignments.length > 0 ? `
                    <div style="margin-top: 15px;">
                        ${profileAssignments.map(assignment => `
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #4f46e5;">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div style="flex: 1;">
                                        <p><strong>${assignment.personName}</strong> <em>(${assignment.roleType})</em></p>
                                        ${assignment.personEmail ? `<p><strong>Email:</strong> ${assignment.personEmail}</p>` : ''}
                                        ${assignment.startDate ? `<p><strong>Start Date:</strong> ${formatDate(assignment.startDate)}</p>` : ''}
                                        ${assignment.personSkills ? `<p><strong>Skills:</strong> ${assignment.personSkills}</p>` : ''}
                                        ${assignment.notes ? `<p><strong>Notes:</strong> ${assignment.notes}</p>` : ''}
                                    </div>
                                    <button class="btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" onclick="removeAssignment(${assignment.roleId}, '${assignment.personName}'); closeModal(); renderProfiles();">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p>No team members assigned yet.</p>'}
            `;
            
            document.getElementById('assignment-modal').style.display = 'block';
        }

        function quickAssign(profileId) {
            // Switch to assign tab and pre-select the role
            switchTabProgrammatically('assign');
            document.getElementById('selectRole').value = profileId;
            document.getElementById('personName').focus();
        }

        function switchTabProgrammatically(tabName) {
            // Update nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Find and activate the correct tab
            const tabs = document.querySelectorAll('.nav-tab');
            const tabIndex = tabName === 'create' ? 0 : tabName === 'assign' ? 1 : 2;
            tabs[tabIndex].classList.add('active');

            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName + '-tab').classList.add('active');

            if (tabName === 'assign') {
                updateRoleSelect();
            }
        }

        function removeAssignment(roleId, personName) {
            if (confirm(`Are you sure you want to remove ${personName} from this role?`)) {
                assignments = assignments.filter(a => !(a.roleId === roleId && a.personName === personName));
                renderProfiles();
            }
        }

        function deleteRoleProfile(profileId) {
            const profile = roleProfiles.find(p => p.id === profileId);
            const assignmentCount = assignments.filter(a => a.roleId === profileId).length;
            
            let confirmMessage = `Are you sure you want to delete the "${profile.roleName}" role profile?`;
            if (assignmentCount > 0) {
                confirmMessage += `\n\nThis will also remove ${assignmentCount} team member assignment(s).`;
            }
            
            if (confirm(confirmMessage)) {
                roleProfiles = roleProfiles.filter(p => p.id !== profileId);
                assignments = assignments.filter(a => a.roleId !== profileId);
                renderProfiles();
                updateRoleSelect();
            }
        }

        function closeModal() {
            document.getElementById('assignment-modal').style.display = 'none';
        }

        function showSuccessMessage(messageId) {
            const message = document.getElementById(messageId);
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        }

        function formatDepartment(dept) {
            return dept.charAt(0).toUpperCase() + dept.slice(1).replace(/([A-Z])/g, ' $1');
        }

        function formatDate(dateString) {
            if (!dateString) return '';
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        function getIconForDepartment(department) {
            const icons = {
                engineering: '⚙️',
                design: '🎨',
                marketing: '📈',
                sales: '💼',
                hr: '👥',
                finance: '💰',
                operations: '🔧',
                product: '📱'
            };
            return icons[department] || '📋';
        }

        function getPriorityColor(priority) {
            const colors = {
                high: '#ef4444',
                medium: '#f59e0b',
                low: '#10b981'
            };
            return colors[priority] || '#6b7280';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('assignment-modal');
            if (event.target === modal) {
                closeModal();
            }
        }