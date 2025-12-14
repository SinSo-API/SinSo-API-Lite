// export const dashboardHTML = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>SinSo API - Dashboard</title>
//     <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
//         .container { max-width: 1200px; margin: 0 auto; }
//         .header { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; text-align: center; }
//         .header h1 { color: #667eea; margin-bottom: 10px; }
//         .mode-toggle { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
//         .mode-btn { background: #f5f5f5; padding: 12px 30px; border-radius: 25px; cursor: pointer; transition: all 0.3s; font-weight: 600; border: 2px solid transparent; }
//         .mode-btn.active { background: #667eea; color: white; border-color: #667eea; }
//         .mode-btn:hover { transform: translateY(-2px); }
//         .user-section { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
//         .user-section h2 { color: #333; margin-bottom: 20px; }
//         .form-group { margin-bottom: 20px; position: relative; }
//         label { display: block; margin-bottom: 8px; color: #555; font-weight: 600; }
//         input[type="text"], input[type="email"], input[type="number"], input[type="password"], textarea, select { width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; font-family: inherit; }
//         input:focus, textarea:focus, select:focus { outline: none; border-color: #667eea; }
//         textarea { resize: vertical; min-height: 150px; }
//         .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
//         button { background: #667eea; color: white; padding: 14px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.3s; width: 100%; }
//         button:hover { background: #5568d3; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
//         button:disabled { background: #ccc; cursor: not-allowed; transform: none; }
//         .admin-login { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto; }
//         .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
//         .stat-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
//         .stat-card h3 { color: #666; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
//         .stat-card .number { font-size: 36px; font-weight: bold; color: #667eea; }
//         .tabs { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
//         .tab { background: white; padding: 12px 24px; border-radius: 8px; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-weight: 600; }
//         .tab.active { background: #667eea; color: white; }
//         .suggestions { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
//         .suggestion-card { border: 2px solid #e0e0e0; padding: 20px; margin-bottom: 15px; border-radius: 8px; transition: all 0.3s; }
//         .suggestion-card:hover { border-color: #667eea; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2); }
//         .suggestion-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
//         .suggestion-title { font-size: 20px; font-weight: bold; color: #333; }
//         .suggestion-artist { color: #666; margin-top: 5px; }
//         .suggestion-meta { display: flex; gap: 15px; margin-bottom: 15px; font-size: 14px; color: #666; flex-wrap: wrap; }
//         .suggestion-lyrics { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 15px; white-space: pre-wrap; font-size: 14px; max-height: 150px; overflow-y: auto; }
//         .suggestion-actions { display: flex; gap: 10px; flex-wrap: wrap; }
//         .suggestion-actions button { width: auto; padding: 10px 20px; font-size: 14px; }
//         .btn-approve { background: #10b981; }
//         .btn-approve:hover { background: #059669; }
//         .btn-reject { background: #ef4444; }
//         .btn-reject:hover { background: #dc2626; }
//         .btn-delete { background: #6b7280; }
//         .btn-delete:hover { background: #4b5563; }
//         .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600; }
//         .status-pending { background: #fef3c7; color: #92400e; }
//         .status-approved { background: #d1fae5; color: #065f46; }
//         .status-rejected { background: #fee2e2; color: #991b1b; }
//         .empty-state { text-align: center; padding: 60px 20px; color: #666; }
//         .empty-state h3 { margin-bottom: 10px; font-size: 20px; }
//         .loading { text-align: center; padding: 40px; color: #666; }
//         .error { background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
//         .success { background: #d1fae5; color: #065f46; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
//         .logout-btn { background: #ef4444; width: auto; padding: 10px 20px; font-size: 14px; }
//         .logout-btn:hover { background: #dc2626; }
//         .modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center; }
//         .modal.active { display: flex; }
//         .modal-content { background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; }
//         .modal-content h3 { margin-bottom: 20px; }
//         .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
//         .modal-actions button { width: auto; padding: 10px 20px; }
//         .required { color: #ef4444; }
//         .autocomplete-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 2px solid #667eea; border-top: none; border-radius: 0 0 8px 8px; max-height: 200px; overflow-y: auto; z-index: 10; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
//         .autocomplete-item { padding: 10px 12px; cursor: pointer; transition: background 0.2s; }
//         .autocomplete-item:hover { background: #f0f0f0; }
//         .autocomplete-item.selected { background: #e8edff; }
//         .help-text { font-size: 12px; color: #888; margin-top: 4px; }
//         @media (max-width: 768px) {
//             .form-row { grid-template-columns: 1fr; }
//             .mode-toggle { flex-direction: column; }
//             .suggestion-header { flex-direction: column; gap: 10px; }
//         }
//     </style>
// </head>
// <body>
//     <div id="app"></div>
//     <script>
//         const API_URL = window.location.origin + '/api/v1';
//         const CURRENT_YEAR = new Date().getFullYear();
        
//         let mode = 'user';
//         let apiKey = localStorage.getItem('admin_api_key') || '';
//         let currentTab = 'pending';
//         let stats = null;
//         let suggestions = [];
//         let loading = false;
//         let error = null;
//         let success = null;
//         let modalOpen = false;
//         let modalData = null;
        
//         let artists = [];
//         let artistSuggestions = [];
//         let composerSuggestions = [];
//         let lyricistSuggestions = [];
        
//         let userForm = {
//             songName: '',
//             songNameSinhala: '',
//             artistName: '',
//             artistNameSinhala: '',
//             duration: '',
//             releaseYear: '',
//             composer: '',
//             lyricist: '',
//             lyricContent: '',
//             lyricContentSinhala: ''
//         };
        
//         function switchMode(newMode) {
//             mode = newMode;
//             error = null;
//             success = null;
//             render();
//             if (mode === 'admin' && apiKey) {
//                 verifyAndLoadData();
//             }
//         }
        
//         async function setApiKey(key) {
//             if (!key.trim()) {
//                 alert('Please enter an API key');
//                 return;
//             }
            
//             loading = true;
//             render();
            
//             try {
//                 const response = await fetch(API_URL + '/admin/stats', {
//                     headers: { 'Authorization': 'Bearer ' + key }
//                 });
                
//                 const data = await response.json();
//                 console.log('API Response:', response.status, data);
                
//                 if (response.ok && data.status === 200) {
//                     apiKey = key;
//                     localStorage.setItem('admin_api_key', key);
//                     await loadData();
//                 } else {
//                     const errorMsg = data.message || data.details || 'Invalid API key';
//                     alert('❌ ' + errorMsg + '. Please check and try again.');
//                     apiKey = '';
//                     localStorage.removeItem('admin_api_key');
//                     loading = false;
//                     render();
//                 }
//             } catch (err) {
//                 alert('❌ Failed to verify API key: ' + err.message);
//                 apiKey = '';
//                 localStorage.removeItem('admin_api_key');
//                 loading = false;
//                 render();
//             }
//         }
        
//         async function verifyAndLoadData() {
//             loading = true;
//             render();
            
//             try {
//                 const response = await fetch(API_URL + '/admin/stats', {
//                     headers: { 'Authorization': 'Bearer ' + apiKey }
//                 });
                
//                 if (!response.ok) {
//                     alert('❌ Session expired or invalid API key. Please login again.');
//                     logout();
//                     return;
//                 }
                
//                 await loadData();
//             } catch (err) {
//                 alert('❌ Failed to verify session: ' + err.message);
//                 logout();
//             } finally {
//                 loading = false;
//                 render();
//             }
//         }
        
//         function logout() {
//             apiKey = '';
//             localStorage.removeItem('admin_api_key');
//             mode = 'admin';
//             render();
//         }
        
//         async function loadArtists() {
//             try {
//                 const response = await fetch(API_URL + '/artists');
//                 const data = await response.json();
//                 if (response.ok && data.data) {
//                     artists = data.data.map(a => ({
//                         name: a.ArtistName,
//                         nameSinhala: a.ArtistNameSinhala
//                     }));
//                 }
//             } catch (err) {
//                 console.error('Failed to load artists:', err);
//             }
//         }
        
//         function filterArtists(query, field) {
//             if (!query || query.length < 1) {
//                 if (field === 'artist') artistSuggestions = [];
//                 if (field === 'composer') composerSuggestions = [];
//                 if (field === 'lyricist') lyricistSuggestions = [];
//                 render();
//                 return;
//             }
            
//             const filtered = artists.filter(a => 
//                 a.name.toLowerCase().includes(query.toLowerCase()) ||
//                 (a.nameSinhala && a.nameSinhala.includes(query))
//             ).slice(0, 5);
            
//             if (field === 'artist') artistSuggestions = filtered;
//             if (field === 'composer') composerSuggestions = filtered;
//             if (field === 'lyricist') lyricistSuggestions = filtered;
            
//             render();
//         }
        
//         function selectArtist(artist, field) {
//             if (field === 'artist') {
//                 userForm.artistName = artist.name;
//                 userForm.artistNameSinhala = artist.nameSinhala || '';
//                 artistSuggestions = [];
//             } else if (field === 'composer') {
//                 userForm.composer = artist.name;
//                 composerSuggestions = [];
//             } else if (field === 'lyricist') {
//                 userForm.lyricist = artist.name;
//                 lyricistSuggestions = [];
//             }
//             render();
//         }
        
//         function isSinhalaUnicode(text) {
//             const sinhalaRegex = /[\u0D80-\u0DFF]/;
//             return sinhalaRegex.test(text);
//         }
        
//         async function submitSuggestion(e) {
//             e.preventDefault();
            
//             if (!userForm.songName || !userForm.songNameSinhala || !userForm.artistName || 
//                 !userForm.artistNameSinhala || !userForm.lyricContent || !userForm.lyricContentSinhala) {
//                 error = 'Please fill in all required fields marked with *';
//                 render();
//                 return;
//             }
            
//             if (!isSinhalaUnicode(userForm.songNameSinhala)) {
//                 error = 'Song Name (Sinhala) must contain Sinhala characters';
//                 render();
//                 return;
//             }
            
//             if (!isSinhalaUnicode(userForm.artistNameSinhala)) {
//                 error = 'Artist Name (Sinhala) must contain Sinhala characters';
//                 render();
//                 return;
//             }
            
//             if (!isSinhalaUnicode(userForm.lyricContentSinhala)) {
//                 error = 'Lyrics (Sinhala) must contain Sinhala characters';
//                 render();
//                 return;
//             }
            
//             if (userForm.duration && (isNaN(userForm.duration) || userForm.duration <= 0)) {
//                 error = 'Duration must be a positive number in seconds';
//                 render();
//                 return;
//             }
            
//             if (userForm.releaseYear && (userForm.releaseYear < 1900 || userForm.releaseYear > CURRENT_YEAR)) {
//                 error = 'Release Year must be between 1900 and ' + CURRENT_YEAR;
//                 render();
//                 return;
//             }
            
//             loading = true;
//             error = null;
//             success = null;
//             render();
            
//             try {
//                 const payload = {
//                     title: userForm.songName,
//                     artist: userForm.artistName,
//                     year: userForm.releaseYear ? parseInt(userForm.releaseYear) : null,
//                     lyrics: userForm.lyricContent,
//                     submitter_name: 'Dashboard User',
//                     submitter_email: null,
//                     songNameSinhala: userForm.songNameSinhala,
//                     artistNameSinhala: userForm.artistNameSinhala,
//                     duration: userForm.duration ? parseInt(userForm.duration) : null,
//                     composer: userForm.composer || null,
//                     lyricist: userForm.lyricist || null,
//                     lyricContentSinhala: userForm.lyricContentSinhala
//                 };
                
//                 const response = await fetch(API_URL + '/suggestions', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(payload)
//                 });
                
//                 const data = await response.json();
                
//                 if (response.ok) {
//                     success = '🎉 Thank you! Suggestion ID: ' + data.data.suggestion_id;
//                     userForm = {
//                         songName: '', songNameSinhala: '', artistName: '', artistNameSinhala: '',
//                         duration: '', releaseYear: '', composer: '', lyricist: '',
//                         lyricContent: '', lyricContentSinhala: ''
//                     };
//                 } else {
//                     throw new Error(data.message || data.details);
//                 }
//             } catch (err) {
//                 error = 'Failed: ' + err.message;
//             } finally {
//                 loading = false;
//                 render();
//             }
//         }
        
//         function updateFormField(field, value) {
//             userForm[field] = value;
            
//             if (field === 'artistName') {
//                 filterArtists(value, 'artist');
//             } else if (field === 'composer') {
//                 filterArtists(value, 'composer');
//             } else if (field === 'lyricist') {
//                 filterArtists(value, 'lyricist');
//             }
//         }
        
//         async function loadStats() {
//             try {
//                 const response = await fetch(API_URL + '/admin/stats', {
//                     headers: { 'Authorization': 'Bearer ' + apiKey }
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     stats = data.data;
//                 } else {
//                     throw new Error(data.message);
//                 }
//             } catch (err) {
//                 error = 'Failed to load stats: ' + err.message;
//             }
//         }
        
//         async function loadSuggestions(status) {
//             loading = true;
//             error = null;
//             render();
            
//             try {
//                 const response = await fetch(API_URL + '/admin/suggestions?status=' + status, {
//                     headers: { 'Authorization': 'Bearer ' + apiKey }
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     suggestions = data.data;
//                 } else {
//                     throw new Error(data.message);
//                 }
//             } catch (err) {
//                 error = 'Failed: ' + err.message;
//             } finally {
//                 loading = false;
//                 render();
//             }
//         }
        
//         async function approveSuggestion(id) {
//             if (!confirm('Approve this suggestion?')) return;
            
//             loading = true;
//             render();
            
//             try {
//                 const response = await fetch(API_URL + '/admin/suggestions/' + id + '/approve', {
//                     method: 'POST',
//                     headers: { 'Authorization': 'Bearer ' + apiKey }
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     success = '✅ Approved! Song ID: ' + data.data.song_id;
//                     await loadData();
//                 } else {
//                     throw new Error(data.message || data.details);
//                 }
//             } catch (err) {
//                 error = 'Failed: ' + err.message;
//             } finally {
//                 loading = false;
//                 render();
//             }
//         }
        
//         function openRejectModal(suggestion) {
//             modalData = suggestion;
//             modalOpen = true;
//             render();
//         }
        
//         function closeModal() {
//             modalOpen = false;
//             modalData = null;
//             render();
//         }
        
//         async function rejectSuggestion(id) {
//             const reason = document.getElementById('rejectReason').value.trim();
            
//             if (!reason) {
//                 alert('Please provide a reason for rejection');
//                 return;
//             }
            
//             loading = true;
//             render();
            
//             try {
//                 const response = await fetch(API_URL + '/admin/suggestions/' + id + '/reject', {
//                     method: 'POST',
//                     headers: { 
//                         'Authorization': 'Bearer ' + apiKey,
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ reason: reason })
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     success = '✅ Rejected successfully';
//                     closeModal();
//                     await loadData();
//                 } else {
//                     throw new Error(data.message || data.details);
//                 }
//             } catch (err) {
//                 error = 'Failed: ' + err.message;
//             } finally {
//                 loading = false;
//                 render();
//             }
//         }
        
//         async function deleteSuggestion(id) {
//             if (!confirm('Delete permanently?')) return;
            
//             loading = true;
//             render();
            
//             try {
//                 const response = await fetch(API_URL + '/admin/suggestions/' + id, {
//                     method: 'DELETE',
//                     headers: { 'Authorization': 'Bearer ' + apiKey }
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     success = '✅ Deleted';
//                     await loadData();
//                 } else {
//                     throw new Error(data.message || data.details);
//                 }
//             } catch (err) {
//                 error = 'Failed: ' + err.message;
//             } finally {
//                 loading = false;
//                 render();
//             }
//         }
        
//         function changeTab(tab) {
//             currentTab = tab;
//             success = null;
//             error = null;
//             loadSuggestions(tab);
//         }
        
//         async function loadData() {
//             await loadStats();
//             await loadSuggestions(currentTab);
//         }
        
//         function renderHeader() {
//             return \`<div class="header"><h1>🎵 SinSo API Dashboard</h1><p>Sinhala Song Lyrics Collection</p><div class="mode-toggle"><div class="mode-btn \${mode === 'user' ? 'active' : ''}" onclick="switchMode('user')">👤 Submit Suggestion</div><div class="mode-btn \${mode === 'admin' ? 'active' : ''}" onclick="switchMode('admin')">🔐 Admin Panel</div></div></div>\`;
//         }
        
//         function renderAutocomplete(suggestions, field) {
//             if (suggestions.length === 0) return '';
//             return \`<div class="autocomplete-dropdown">\${suggestions.map(s => 
//                 \`<div class="autocomplete-item" onclick="selectArtist({name:'\${s.name.replace(/'/g, "\\\\'")}',nameSinhala:'\${(s.nameSinhala || '').replace(/'/g, "\\\\'")}'},'\${field}')">\${s.name}\${s.nameSinhala ? ' - ' + s.nameSinhala : ''}</div>\`
//             ).join('')}</div>\`;
//         }
        
//         function renderUserSection() {
//             return \`<div class="container">\${renderHeader()}\${error ? '<div class="error">' + error + '</div>' : ''}\${success ? '<div class="success">' + success + '</div>' : ''}<div class="user-section"><h2>📝 Suggest a New Song</h2><p style="color: #666; margin-bottom: 30px;">Help us grow our collection!</p><form onsubmit="submitSuggestion(event)"><div class="form-row"><div class="form-group"><label>Song Name <span class="required">*</span></label><input type="text" value="\${userForm.songName}" oninput="updateFormField('songName', this.value)" placeholder="e.g., Sanda Eliya" required></div><div class="form-group"><label>Song Name (Sinhala) <span class="required">*</span></label><input type="text" value="\${userForm.songNameSinhala}" oninput="updateFormField('songNameSinhala', this.value)" placeholder="e.g., සඳ එළිය" required><div class="help-text">Sinhala unicode only</div></div></div><div class="form-row"><div class="form-group"><label>Artist Name <span class="required">*</span></label><input type="text" value="\${userForm.artistName}" oninput="updateFormField('artistName', this.value)" placeholder="Start typing artist name..." autocomplete="off" required>\${renderAutocomplete(artistSuggestions, 'artist')}</div><div class="form-group"><label>Artist Name (Sinhala) <span class="required">*</span></label><input type="text" value="\${userForm.artistNameSinhala}" oninput="updateFormField('artistNameSinhala', this.value)" placeholder="e.g., අමරසිරි පීරිස්" required><div class="help-text">Sinhala unicode only</div></div></div><div class="form-row"><div class="form-group"><label>Duration (seconds)</label><input type="number" value="\${userForm.duration}" oninput="updateFormField('duration', this.value)" placeholder="e.g., 240" min="1"></div><div class="form-group"><label>Release Year</label><input type="number" value="\${userForm.releaseYear}" oninput="updateFormField('releaseYear', this.value)" placeholder="e.g., 1995" min="1900" max="\${CURRENT_YEAR}"></div></div><div class="form-row"><div class="form-group"><label>Composer</label><input type="text" value="\${userForm.composer}" oninput="updateFormField('composer', this.value)" placeholder="Start typing..." autocomplete="off">\${renderAutocomplete(composerSuggestions, 'composer')}</div><div class="form-group"><label>Lyricist</label><input type="text" value="\${userForm.lyricist}" oninput="updateFormField('lyricist', this.value)" placeholder="Start typing..." autocomplete="off">\${renderAutocomplete(lyricistSuggestions, 'lyricist')}</div></div><div class="form-row"><div class="form-group"><label>Lyrics <span class="required">*</span></label><textarea oninput="updateFormField('lyricContent', this.value)" placeholder="Enter lyrics in English/transliteration..." required>\${userForm.lyricContent}</textarea></div><div class="form-group"><label>Lyrics (Sinhala) <span class="required">*</span></label><textarea oninput="updateFormField('lyricContentSinhala', this.value)" placeholder="ගී පද සිංහලෙන් ඇතුළත් කරන්න..." required>\${userForm.lyricContentSinhala}</textarea><div class="help-text">Sinhala unicode only</div></div></div><button type="submit" \${loading ? 'disabled' : ''}>\${loading ? '⏳ Submitting...' : '✨ Submit Suggestion'}</button></form></div></div>\`;
//         }
        
//         function renderAdminLogin() {
//             return \`<div class="container">\${renderHeader()}<div class="admin-login"><h2>🔐 Admin Login</h2><p style="color: #666; margin-bottom: 20px;">Enter your admin API key</p><div class="form-group"><label>API Key</label><input type="password" id="apiKeyInput" placeholder="Enter admin API key"></div><button onclick="setApiKey(document.getElementById('apiKeyInput').value)" \${loading ? 'disabled' : ''}>\${loading ? '⏳ Verifying...' : '🔓 Login'}</button></div></div>\`;
//         }
        
//         function renderAdminDashboard() {
//             return \`<div class="container">\${renderHeader()}<div style="text-align: right; margin-bottom: 20px;"><button class="logout-btn" onclick="logout()">🚪 Logout</button></div>\${error ? '<div class="error">' + error + '</div>' : ''}\${success ? '<div class="success">' + success + '</div>' : ''}\${stats ? '<div class="stats"><div class="stat-card"><h3>Total Songs</h3><div class="number">' + stats.total_songs + '</div></div><div class="stat-card"><h3>Pending</h3><div class="number">' + stats.pending_suggestions + '</div></div><div class="stat-card"><h3>Approved</h3><div class="number">' + stats.approved_suggestions + '</div></div><div class="stat-card"><h3>Rejected</h3><div class="number">' + stats.rejected_suggestions + '</div></div></div>' : ''}<div class="tabs"><div class="tab \${currentTab === 'pending' ? 'active' : ''}" onclick="changeTab('pending')">⏳ Pending</div><div class="tab \${currentTab === 'approved' ? 'active' : ''}" onclick="changeTab('approved')">✅ Approved</div><div class="tab \${currentTab === 'rejected' ? 'active' : ''}" onclick="changeTab('rejected')">❌ Rejected</div></div><div class="suggestions">\${loading ? '<div class="loading">⏳ Loading...</div>' : (suggestions.length === 0 ? '<div class="empty-state"><h3>No ' + currentTab + ' suggestions</h3></div>' : suggestions.map(s => '<div class="suggestion-card"><div class="suggestion-header"><div><div class="suggestion-title">' + s.title + '</div><div class="suggestion-artist">by ' + s.artist + '</div></div><span class="status-badge status-' + s.status + '">' + s.status.toUpperCase() + '</span></div><div class="suggestion-meta">' + (s.album ? '<span>📀 ' + s.album + '</span>' : '') + (s.year ? '<span>📅 ' + s.year + '</span>' : '') + '<span>🕒 ' + new Date(s.created_at).toLocaleString() + '</span></div><div class="suggestion-lyrics">' + s.lyrics + '</div>' + (s.rejection_reason ? '<div style="background: #fee2e2; color: #991b1b; padding: 10px; border-radius: 5px; margin-bottom: 15px;"><strong>❌ Rejection reason:</strong> ' + s.rejection_reason + '</div>' : '') + (currentTab === 'pending' ? '<div class="suggestion-actions"><button class="btn-approve" onclick="approveSuggestion(' + s.id + ')">✓ Approve</button><button class="btn-reject" onclick="openRejectModal(' + JSON.stringify(s).replace(/"/g, '&quot;') + ')">✗ Reject</button><button class="btn-delete" onclick="deleteSuggestion(' + s.id + ')">🗑 Delete</button></div>' : '') + '</div>').join(''))}</div></div>\${modalOpen && modalData ? '<div class="modal active"><div class="modal-content"><h3>❌ Reject Suggestion</h3><p style="margin-bottom: 15px;"><strong>' + modalData.title + '</strong> by ' + modalData.artist + '</p><div class="form-group"><label>Reason for rejection <span class="required">*</span></label><textarea id="rejectReason" rows="4" placeholder="Please provide a clear reason (e.g., Incomplete lyrics, duplicate entry, incorrect information...)" required></textarea><div class="help-text">This reason will be visible to help improve future submissions</div></div><div class="modal-actions"><button onclick="closeModal()">Cancel</button><button class="btn-reject" onclick="rejectSuggestion(' + modalData.id + ')">✗ Reject with Reason</button></div></div></div>' : ''}\`;
//         }
        
//         function render() {
//             const app = document.getElementById('app');
//             if (mode === 'user') {
//                 app.innerHTML = renderUserSection();
//             } else {
//                 app.innerHTML = apiKey ? renderAdminDashboard() : renderAdminLogin();
//             }
//         }
        
//         loadArtists();
//         render();
//         if (mode === 'admin' && apiKey) verifyAndLoadData();
//     </script>
// </body>
// </html>`;

export const dashboardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SinSo API - Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); margin-bottom: 20px; text-align: center; }
        .header h1 { color: #1e3a8a; margin-bottom: 10px; }
        .mode-toggle { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
        .mode-btn { background: #f5f5f5; padding: 12px 30px; border-radius: 25px; cursor: pointer; transition: all 0.3s; font-weight: 600; border: 2px solid transparent; }
        .mode-btn.active { background: #1e3a8a; color: white; border-color: #1e3a8a; }
        .mode-btn:hover { transform: translateY(-2px); background: #e0e7ff; }
        .user-section { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
        .user-section h2 { color: #333; margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; position: relative; }
        label { display: block; margin-bottom: 8px; color: #555; font-weight: 600; }
        input[type="text"], input[type="email"], input[type="number"], input[type="password"], textarea, select { width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; font-family: inherit; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #1e3a8a; }
        textarea { resize: vertical; min-height: 150px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        button { background: #1e3a8a; color: white; padding: 14px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.3s; width: 100%; }
        button:hover { background: #1e40af; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4); }
        button:disabled { background: #ccc; cursor: not-allowed; transform: none; }
        .admin-login { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); max-width: 400px; margin: 0 auto; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .stat-card { background: white; padding: 25px; border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
        .stat-card h3 { color: #666; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
        .stat-card .number { font-size: 36px; font-weight: bold; color: #1e3a8a; }
        .tabs { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .tab { background: white; padding: 12px 24px; border-radius: 8px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 8px rgba(0,0,0,0.1); font-weight: 600; }
        .tab.active { background: #1e3a8a; color: white; }
        .tab:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
        .suggestions { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
        .suggestion-card { border: 2px solid #e0e0e0; padding: 20px; margin-bottom: 15px; border-radius: 8px; transition: all 0.3s; }
        .suggestion-card:hover { border-color: #1e3a8a; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2); }
        .suggestion-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
        .suggestion-title { font-size: 20px; font-weight: bold; color: #1e3a8a; }
        .suggestion-artist { color: #666; margin-top: 5px; }
        .suggestion-meta { display: flex; gap: 15px; margin-bottom: 15px; font-size: 14px; color: #666; flex-wrap: wrap; }
        .suggestion-lyrics { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 15px; white-space: pre-wrap; font-size: 14px; max-height: 150px; overflow-y: auto; }
        .suggestion-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .suggestion-actions button { width: auto; padding: 10px 20px; font-size: 14px; }
        .btn-approve { background: #10b981; }
        .btn-approve:hover { background: #059669; }
        .btn-reject { background: #ef4444; }
        .btn-reject:hover { background: #dc2626; }
        .btn-delete { background: #6b7280; }
        .btn-delete:hover { background: #4b5563; }
        .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-approved { background: #d1fae5; color: #065f46; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .empty-state { text-align: center; padding: 60px 20px; color: #666; }
        .empty-state h3 { margin-bottom: 10px; font-size: 20px; }
        .loading { text-align: center; padding: 40px; color: #666; }
        .error { background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .success { background: #d1fae5; color: #065f46; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .logout-btn { background: #ef4444; width: auto; padding: 10px 20px; font-size: 14px; }
        .logout-btn:hover { background: #dc2626; }
        .modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center; }
        .modal.active { display: flex; }
        .modal-content { background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; }
        .modal-content h3 { margin-bottom: 20px; }
        .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
        .modal-actions button { width: auto; padding: 10px 20px; }
        .required { color: #ef4444; }
        .autocomplete-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 2px solid #1e3a8a; border-top: none; border-radius: 0 0 8px 8px; max-height: 200px; overflow-y: auto; z-index: 10; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .autocomplete-item { padding: 10px 12px; cursor: pointer; transition: background 0.2s; }
        .autocomplete-item:hover { background: #e0e7ff; }
        .autocomplete-item.selected { background: #dbeafe; }
        .help-text { font-size: 12px; color: #888; margin-top: 4px; }
        @media (max-width: 768px) {
            .form-row { grid-template-columns: 1fr; }
            .mode-toggle { flex-direction: column; }
            .suggestion-header { flex-direction: column; gap: 10px; }
        }
    </style>
</head>
<body>
    <div id="app"></div>
    <script>
        const API_URL = window.location.origin + '/api/v1';
        const CURRENT_YEAR = new Date().getFullYear();
        
        let mode = 'user';
        let apiKey = localStorage.getItem('admin_api_key') || '';
        let currentTab = 'pending';
        let stats = null;
        let suggestions = [];
        let loading = false;
        let error = null;
        let success = null;
        let modalOpen = false;
        let modalData = null;
        
        let artists = [];
        let artistSuggestions = [];
        let composerSuggestions = [];
        let lyricistSuggestions = [];
        
        let userForm = {
            songName: '',
            songNameSinhala: '',
            artistName: '',
            artistNameSinhala: '',
            duration: '',
            releaseYear: '',
            composer: '',
            lyricist: '',
            lyricContent: '',
            lyricContentSinhala: ''
        };
        
        function switchMode(newMode) {
            mode = newMode;
            error = null;
            success = null;
            render();
            if (mode === 'admin' && apiKey) {
                verifyAndLoadData();
            }
        }
        
        async function setApiKey(key) {
            if (!key.trim()) {
                alert('Please enter an API key');
                return;
            }
            
            loading = true;
            render();
            
            try {
                const response = await fetch(API_URL + '/admin/stats', {
                    headers: { 'Authorization': 'Bearer ' + key }
                });
                
                const data = await response.json();
                console.log('API Response:', response.status, data);
                
                if (response.ok && data.status === 200) {
                    apiKey = key;
                    localStorage.setItem('admin_api_key', key);
                    await loadData();
                } else {
                    const errorMsg = data.message || data.details || 'Invalid API key';
                    alert('❌ ' + errorMsg + '. Please check and try again.');
                    apiKey = '';
                    localStorage.removeItem('admin_api_key');
                    loading = false;
                    render();
                }
            } catch (err) {
                alert('❌ Failed to verify API key: ' + err.message);
                apiKey = '';
                localStorage.removeItem('admin_api_key');
                loading = false;
                render();
            }
        }
        
        async function verifyAndLoadData() {
            loading = true;
            render();
            
            try {
                const response = await fetch(API_URL + '/admin/stats', {
                    headers: { 'Authorization': 'Bearer ' + apiKey }
                });
                
                if (!response.ok) {
                    alert('❌ Session expired or invalid API key. Please login again.');
                    logout();
                    return;
                }
                
                await loadData();
            } catch (err) {
                alert('❌ Failed to verify session: ' + err.message);
                logout();
            } finally {
                loading = false;
                render();
            }
        }
        
        function logout() {
            apiKey = '';
            localStorage.removeItem('admin_api_key');
            mode = 'admin';
            render();
        }
        
        async function loadArtists() {
            try {
                const response = await fetch(API_URL + '/artists');
                const data = await response.json();
                if (response.ok && data.data) {
                    artists = data.data.map(a => ({
                        name: a.ArtistName,
                        nameSinhala: a.ArtistNameSinhala
                    }));
                }
            } catch (err) {
                console.error('Failed to load artists:', err);
            }
        }
        
        function filterArtists(query, field) {
            if (!query || query.length < 1) {
                if (field === 'artist') artistSuggestions = [];
                if (field === 'composer') composerSuggestions = [];
                if (field === 'lyricist') lyricistSuggestions = [];
                updateDropdown(field);
                return;
            }
            
            const filtered = artists.filter(a => 
                a.name.toLowerCase().includes(query.toLowerCase()) ||
                (a.nameSinhala && a.nameSinhala.includes(query))
            ).slice(0, 5);
            
            if (field === 'artist') artistSuggestions = filtered;
            if (field === 'composer') composerSuggestions = filtered;
            if (field === 'lyricist') lyricistSuggestions = filtered;
            
            updateDropdown(field);
        }
        
        function updateDropdown(field) {
            let dropdownId = '';
            let suggestions = [];
            
            if (field === 'artist') {
                dropdownId = 'artist-dropdown';
                suggestions = artistSuggestions;
            } else if (field === 'composer') {
                dropdownId = 'composer-dropdown';
                suggestions = composerSuggestions;
            } else if (field === 'lyricist') {
                dropdownId = 'lyricist-dropdown';
                suggestions = lyricistSuggestions;
            }
            
            const dropdown = document.getElementById(dropdownId);
            if (!dropdown) return;
            
            if (suggestions.length === 0) {
                dropdown.innerHTML = '';
                return;
            }
            
            dropdown.innerHTML = suggestions.map(s => 
                \`<div class="autocomplete-item" onclick="selectArtist({name:'\${s.name.replace(/'/g, "\\\\'")}',nameSinhala:'\${(s.nameSinhala || '').replace(/'/g, "\\\\'")}'},'\${field}')">\${s.name}\${s.nameSinhala ? ' - ' + s.nameSinhala : ''}</div>\`
            ).join('');
        }
        
        function selectArtist(artist, field) {
            if (field === 'artist') {
                userForm.artistName = artist.name;
                userForm.artistNameSinhala = artist.nameSinhala || '';
                artistSuggestions = [];
                document.getElementById('artistName').value = artist.name;
                document.getElementById('artistNameSinhala').value = artist.nameSinhala || '';
                document.getElementById('artist-dropdown').innerHTML = '';
            } else if (field === 'composer') {
                userForm.composer = artist.name;
                composerSuggestions = [];
                document.getElementById('composer').value = artist.name;
                document.getElementById('composer-dropdown').innerHTML = '';
            } else if (field === 'lyricist') {
                userForm.lyricist = artist.name;
                lyricistSuggestions = [];
                document.getElementById('lyricist').value = artist.name;
                document.getElementById('lyricist-dropdown').innerHTML = '';
            }
        }
        
        function isSinhalaUnicode(text) {
            const sinhalaRegex = /[\u0D80-\u0DFF]/;
            return sinhalaRegex.test(text);
        }
        
        async function submitSuggestion(e) {
            e.preventDefault();
            
            if (!userForm.songName || !userForm.songNameSinhala || !userForm.artistName || 
                !userForm.artistNameSinhala || !userForm.lyricContent || !userForm.lyricContentSinhala) {
                error = 'Please fill in all required fields marked with *';
                render();
                return;
            }
            
            if (!isSinhalaUnicode(userForm.songNameSinhala)) {
                error = 'Song Name (Sinhala) must contain Sinhala characters';
                render();
                return;
            }
            
            if (!isSinhalaUnicode(userForm.artistNameSinhala)) {
                error = 'Artist Name (Sinhala) must contain Sinhala characters';
                render();
                return;
            }
            
            if (!isSinhalaUnicode(userForm.lyricContentSinhala)) {
                error = 'Lyrics (Sinhala) must contain Sinhala characters';
                render();
                return;
            }
            
            if (userForm.duration && (isNaN(userForm.duration) || userForm.duration <= 0)) {
                error = 'Duration must be a positive number in seconds';
                render();
                return;
            }
            
            if (userForm.releaseYear && (userForm.releaseYear < 1900 || userForm.releaseYear > CURRENT_YEAR)) {
                error = 'Release Year must be between 1900 and ' + CURRENT_YEAR;
                render();
                return;
            }
            
            loading = true;
            error = null;
            success = null;
            render();
            
            try {
                const payload = {
                    title: userForm.songName,
                    artist: userForm.artistName,
                    year: userForm.releaseYear ? parseInt(userForm.releaseYear) : null,
                    lyrics: userForm.lyricContent,
                    submitter_name: 'Dashboard User',
                    submitter_email: null,
                    songNameSinhala: userForm.songNameSinhala,
                    artistNameSinhala: userForm.artistNameSinhala,
                    duration: userForm.duration ? parseInt(userForm.duration) : null,
                    composer: userForm.composer || null,
                    lyricist: userForm.lyricist || null,
                    lyricContentSinhala: userForm.lyricContentSinhala
                };
                
                const response = await fetch(API_URL + '/suggestions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    success = '🎉 Thank you! Suggestion ID: ' + data.data.suggestion_id;
                    userForm = {
                        songName: '', songNameSinhala: '', artistName: '', artistNameSinhala: '',
                        duration: '', releaseYear: '', composer: '', lyricist: '',
                        lyricContent: '', lyricContentSinhala: ''
                    };
                } else {
                    throw new Error(data.message || data.details);
                }
            } catch (err) {
                error = 'Failed: ' + err.message;
            } finally {
                loading = false;
                render();
            }
        }
        
        function updateFormField(field, value) {
            userForm[field] = value;
            
            if (field === 'artistName') {
                filterArtists(value, 'artist');
            } else if (field === 'composer') {
                filterArtists(value, 'composer');
            } else if (field === 'lyricist') {
                filterArtists(value, 'lyricist');
            } else {
                // Only re-render dropdowns, not the entire form
                const dropdown = document.querySelector('.autocomplete-dropdown');
                if (!dropdown) return;
            }
        }
        
        async function loadStats() {
            try {
                const response = await fetch(API_URL + '/admin/stats', {
                    headers: { 'Authorization': 'Bearer ' + apiKey }
                });
                const data = await response.json();
                if (response.ok) {
                    stats = data.data;
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                error = 'Failed to load stats: ' + err.message;
            }
        }
        
        async function loadSuggestions(status) {
            loading = true;
            error = null;
            render();
            
            try {
                const response = await fetch(API_URL + '/admin/suggestions?status=' + status, {
                    headers: { 'Authorization': 'Bearer ' + apiKey }
                });
                const data = await response.json();
                if (response.ok) {
                    suggestions = data.data;
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                error = 'Failed: ' + err.message;
            } finally {
                loading = false;
                render();
            }
        }
        
        async function approveSuggestion(id) {
            if (!confirm('Approve this suggestion?')) return;
            
            loading = true;
            render();
            
            try {
                const response = await fetch(API_URL + '/admin/suggestions/' + id + '/approve', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + apiKey }
                });
                const data = await response.json();
                if (response.ok) {
                    success = '✅ Approved! Song ID: ' + data.data.song_id;
                    await loadData();
                } else {
                    throw new Error(data.message || data.details);
                }
            } catch (err) {
                error = 'Failed: ' + err.message;
            } finally {
                loading = false;
                render();
            }
        }
        
        function openRejectModal(suggestion) {
            modalData = suggestion;
            modalOpen = true;
            render();
        }
        
        function closeModal() {
            modalOpen = false;
            modalData = null;
            render();
        }
        
        async function rejectSuggestion(id) {
            const reason = document.getElementById('rejectReason').value.trim();
            
            if (!reason) {
                alert('Please provide a reason for rejection');
                return;
            }
            
            loading = true;
            render();
            
            try {
                const response = await fetch(API_URL + '/admin/suggestions/' + id + '/reject', {
                    method: 'POST',
                    headers: { 
                        'Authorization': 'Bearer ' + apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reason: reason })
                });
                const data = await response.json();
                if (response.ok) {
                    success = '✅ Rejected successfully';
                    closeModal();
                    await loadData();
                } else {
                    throw new Error(data.message || data.details);
                }
            } catch (err) {
                error = 'Failed: ' + err.message;
            } finally {
                loading = false;
                render();
            }
        }
        
        async function deleteSuggestion(id) {
            if (!confirm('Delete permanently?')) return;
            
            loading = true;
            render();
            
            try {
                const response = await fetch(API_URL + '/admin/suggestions/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + apiKey }
                });
                const data = await response.json();
                if (response.ok) {
                    success = '✅ Deleted';
                    await loadData();
                } else {
                    throw new Error(data.message || data.details);
                }
            } catch (err) {
                error = 'Failed: ' + err.message;
            } finally {
                loading = false;
                render();
            }
        }
        
        function changeTab(tab) {
            currentTab = tab;
            success = null;
            error = null;
            loadSuggestions(tab);
        }
        
        async function loadData() {
            await loadStats();
            await loadSuggestions(currentTab);
        }
        
        function renderHeader() {
            return \`<div class="header"><h1>🎵 SinSo API Dashboard</h1><p>Sinhala Song Lyrics Collection</p><div class="mode-toggle"><div class="mode-btn \${mode === 'user' ? 'active' : ''}" onclick="switchMode('user')">👤 Submit Suggestion</div><div class="mode-btn \${mode === 'admin' ? 'active' : ''}" onclick="switchMode('admin')">🔐 Admin Panel</div></div></div>\`;
        }
        
        function renderAutocomplete(field) {
            return \`<div class="autocomplete-dropdown" id="\${field}-dropdown"></div>\`;
        }
        
        function renderUserSection() {
            return \`<div class="container">\${renderHeader()}\${error ? '<div class="error">' + error + '</div>' : ''}\${success ? '<div class="success">' + success + '</div>' : ''}<div class="user-section"><h2>📝 Suggest a New Song</h2><p style="color: #666; margin-bottom: 30px;">Help us grow our collection!</p><form onsubmit="submitSuggestion(event)"><div class="form-row"><div class="form-group"><label>Song Name <span class="required">*</span></label><input type="text" id="songName" value="\${userForm.songName}" oninput="updateFormField('songName', this.value)" placeholder="e.g., Sanda Eliya" required></div><div class="form-group"><label>Song Name (Sinhala) <span class="required">*</span></label><input type="text" id="songNameSinhala" value="\${userForm.songNameSinhala}" oninput="updateFormField('songNameSinhala', this.value)" placeholder="e.g., සඳ එළිය" required><div class="help-text">Sinhala unicode only</div></div></div><div class="form-row"><div class="form-group"><label>Artist Name <span class="required">*</span></label><input type="text" id="artistName" value="\${userForm.artistName}" oninput="updateFormField('artistName', this.value)" placeholder="Start typing artist name..." autocomplete="off" required>\${renderAutocomplete('artist')}</div><div class="form-group"><label>Artist Name (Sinhala) <span class="required">*</span></label><input type="text" id="artistNameSinhala" value="\${userForm.artistNameSinhala}" oninput="updateFormField('artistNameSinhala', this.value)" placeholder="e.g., අමරසිරි පීරිස්" required><div class="help-text">Sinhala unicode only</div></div></div><div class="form-row"><div class="form-group"><label>Duration (seconds)</label><input type="number" id="duration" value="\${userForm.duration}" oninput="updateFormField('duration', this.value)" placeholder="e.g., 240" min="1"></div><div class="form-group"><label>Release Year</label><input type="number" id="releaseYear" value="\${userForm.releaseYear}" oninput="updateFormField('releaseYear', this.value)" placeholder="e.g., 1995" min="1900" max="\${CURRENT_YEAR}"></div></div><div class="form-row"><div class="form-group"><label>Composer</label><input type="text" id="composer" value="\${userForm.composer}" oninput="updateFormField('composer', this.value)" placeholder="Start typing..." autocomplete="off">\${renderAutocomplete('composer')}</div><div class="form-group"><label>Lyricist</label><input type="text" id="lyricist" value="\${userForm.lyricist}" oninput="updateFormField('lyricist', this.value)" placeholder="Start typing..." autocomplete="off">\${renderAutocomplete('lyricist')}</div></div><div class="form-row"><div class="form-group"><label>Lyrics <span class="required">*</span></label><textarea id="lyricContent" oninput="updateFormField('lyricContent', this.value)" placeholder="Enter lyrics in English/transliteration..." required>\${userForm.lyricContent}</textarea></div><div class="form-group"><label>Lyrics (Sinhala) <span class="required">*</span></label><textarea id="lyricContentSinhala" oninput="updateFormField('lyricContentSinhala', this.value)" placeholder="ගී පද සිංහලෙන් ඇතුළත් කරන්න..." required>\${userForm.lyricContentSinhala}</textarea><div class="help-text">Sinhala unicode only</div></div></div><button type="submit" \${loading ? 'disabled' : ''}>\${loading ? '⏳ Submitting...' : '✨ Submit Suggestion'}</button></form></div></div>\`;
        }
        
        function renderAdminLogin() {
            return \`<div class="container">\${renderHeader()}<div class="admin-login"><h2>🔐 Admin Login</h2><p style="color: #666; margin-bottom: 20px;">Enter your admin API key</p><div class="form-group"><label>API Key</label><input type="password" id="apiKeyInput" placeholder="Enter admin API key"></div><button onclick="setApiKey(document.getElementById('apiKeyInput').value)" \${loading ? 'disabled' : ''}>\${loading ? '⏳ Verifying...' : '🔓 Login'}</button></div></div>\`;
        }
        
        function renderAdminDashboard() {
            return \`<div class="container">\${renderHeader()}<div style="text-align: right; margin-bottom: 20px;"><button class="logout-btn" onclick="logout()">🚪 Logout</button></div>\${error ? '<div class="error">' + error + '</div>' : ''}\${success ? '<div class="success">' + success + '</div>' : ''}\${stats ? '<div class="stats"><div class="stat-card"><h3>Total Songs</h3><div class="number">' + stats.total_songs + '</div></div><div class="stat-card"><h3>Pending</h3><div class="number">' + stats.pending_suggestions + '</div></div><div class="stat-card"><h3>Approved</h3><div class="number">' + stats.approved_suggestions + '</div></div><div class="stat-card"><h3>Rejected</h3><div class="number">' + stats.rejected_suggestions + '</div></div></div>' : ''}<div class="tabs"><div class="tab \${currentTab === 'pending' ? 'active' : ''}" onclick="changeTab('pending')">⏳ Pending</div><div class="tab \${currentTab === 'approved' ? 'active' : ''}" onclick="changeTab('approved')">✅ Approved</div><div class="tab \${currentTab === 'rejected' ? 'active' : ''}" onclick="changeTab('rejected')">❌ Rejected</div></div><div class="suggestions">\${loading ? '<div class="loading">⏳ Loading...</div>' : (suggestions.length === 0 ? '<div class="empty-state"><h3>No ' + currentTab + ' suggestions</h3></div>' : suggestions.map(s => '<div class="suggestion-card"><div class="suggestion-header"><div><div class="suggestion-title">' + s.title + '</div><div class="suggestion-artist">by ' + s.artist + '</div></div><span class="status-badge status-' + s.status + '">' + s.status.toUpperCase() + '</span></div><div class="suggestion-meta">' + (s.album ? '<span>📀 ' + s.album + '</span>' : '') + (s.year ? '<span>📅 ' + s.year + '</span>' : '') + '<span>🕒 ' + new Date(s.created_at).toLocaleString() + '</span></div><div class="suggestion-lyrics">' + s.lyrics + '</div>' + (s.rejection_reason ? '<div style="background: #fee2e2; color: #991b1b; padding: 10px; border-radius: 5px; margin-bottom: 15px;"><strong>❌ Rejection reason:</strong> ' + s.rejection_reason + '</div>' : '') + (currentTab === 'pending' ? '<div class="suggestion-actions"><button class="btn-approve" onclick="approveSuggestion(' + s.id + ')">✓ Approve</button><button class="btn-reject" onclick="openRejectModal(' + JSON.stringify(s).replace(/"/g, '&quot;') + ')">✗ Reject</button><button class="btn-delete" onclick="deleteSuggestion(' + s.id + ')">🗑 Delete</button></div>' : '') + '</div>').join(''))}</div></div>\${modalOpen && modalData ? '<div class="modal active"><div class="modal-content"><h3>❌ Reject Suggestion</h3><p style="margin-bottom: 15px;"><strong>' + modalData.title + '</strong> by ' + modalData.artist + '</p><div class="form-group"><label>Reason for rejection <span class="required">*</span></label><textarea id="rejectReason" rows="4" placeholder="Please provide a clear reason (e.g., Incomplete lyrics, duplicate entry, incorrect information...)" required></textarea><div class="help-text">This reason will be visible to help improve future submissions</div></div><div class="modal-actions"><button onclick="closeModal()">Cancel</button><button class="btn-reject" onclick="rejectSuggestion(' + modalData.id + ')">✗ Reject with Reason</button></div></div></div>' : ''}\`;
        }
        
        function render() {
            const app = document.getElementById('app');
            if (mode === 'user') {
                app.innerHTML = renderUserSection();
            } else {
                app.innerHTML = apiKey ? renderAdminDashboard() : renderAdminLogin();
            }
        }
        
        loadArtists();
        render();
        if (mode === 'admin' && apiKey) verifyAndLoadData();
    </script>
</body>
</html>`;