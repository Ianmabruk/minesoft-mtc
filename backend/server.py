from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
from werkzeug.utils import secure_filename
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads/cvs'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Email configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
EMAIL_ADDRESS = os.environ.get('EMAIL_ADDRESS', 'ianmabruk3@gmail.com')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', 'gohj chdt tvwk kskz')

# Ensure directories exist
os.makedirs('db', exist_ok=True)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def read_json_file(filename):
    """Read JSON file, create if doesn't exist"""
    filepath = os.path.join('db', filename)
    if not os.path.exists(filepath):
        with open(filepath, 'w') as f:
            json.dump([], f)
        return []
    
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def write_json_file(filename, data):
    """Write data to JSON file"""
    filepath = os.path.join('db', filename)
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, default=str)

def send_email(to_email, subject, html_content):
    """Send HTML email"""
    try:
        # Skip if no password configured
        if EMAIL_PASSWORD == 'your-app-password':
            print(f"Email would be sent to: {to_email}")
            print(f"Subject: {subject}")
            return True
            
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_email
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def generate_quote_email_html(client_name, quote_amount, project_details, payment_breakdown):
    """Generate HTML email template with MTC logo"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f5f7fa; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: white; }}
            .header {{ background: linear-gradient(135deg, #0A1A2F 0%, #157CFF 100%); padding: 30px; text-align: center; }}
            .logo {{ width: 60px; height: 60px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); 
                     border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; 
                     font-size: 24px; font-weight: bold; color: #0A1A2F; margin-bottom: 15px; }}
            .company-name {{ color: white; font-size: 24px; font-weight: bold; margin: 0; }}
            .tagline {{ color: #DADEE4; margin: 5px 0 0 0; }}
            .content {{ padding: 40px 30px; }}
            .greeting {{ font-size: 18px; color: #0A1A2F; margin-bottom: 20px; }}
            .quote-box {{ background: linear-gradient(135deg, #0A1A2F 0%, #157CFF 20%); 
                         color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; }}
            .quote-amount {{ font-size: 36px; font-weight: bold; color: #D4AF37; }}
            .section {{ margin: 25px 0; }}
            .section-title {{ font-size: 16px; font-weight: bold; color: #0A1A2F; margin-bottom: 10px; }}
            .breakdown {{ background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37; }}
            .breakdown-item {{ display: flex; justify-content: space-between; margin: 8px 0; }}
            .footer {{ background: #0A1A2F; color: white; padding: 30px; text-align: center; }}
            .contact-info {{ margin: 15px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">M</div>
                <h1 class="company-name">MTC LTD</h1>
                <p class="tagline">Engineering the Future of Innovation</p>
            </div>
            
            <div class="content">
                <div class="greeting">Dear {client_name},</div>
                
                <p>Thank you for your interest in MTC LTD's enterprise solutions. We're excited to present your customized project quote.</p>
                
                <div class="quote-box">
                    <h2 style="margin: 0 0 10px 0; color: white;">Your Project Quote</h2>
                    <div class="quote-amount">KSH {quote_amount:,}</div>
                    <p style="margin: 10px 0 0 0; color: #DADEE4;">Total Investment</p>
                </div>
                
                <div class="section">
                    <div class="section-title">Project Overview</div>
                    <p>{project_details}</p>
                </div>
                
                <div class="section">
                    <div class="section-title">Investment Breakdown</div>
                    <div class="breakdown">
                        {payment_breakdown.replace(chr(10), '<br>')}
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">What's Included</div>
                    <ul>
                        <li>Dedicated project manager and team</li>
                        <li>Regular progress updates and reporting</li>
                        <li>Quality assurance and testing</li>
                        <li>Post-launch support and maintenance</li>
                        <li>Enterprise-grade security implementation</li>
                    </ul>
                </div>
                
                <p><strong>Next Steps:</strong> Our team will contact you within 24 hours to discuss the project timeline and answer any questions.</p>
                
                <p>We look forward to partnering with you on this exciting project!</p>
                
                <p>Best regards,<br>
                <strong>MTC LTD Team</strong></p>
            </div>
            
            <div class="footer">
                <div class="contact-info">
                    <strong>Contact Information</strong><br>
                    Email: ianmabruk3@gmail.com | Phone: +1 (555) 123-4567<br>
                    Address: 123 Enterprise Plaza, New York, NY 10001
                </div>
                <p style="margin: 20px 0 0 0; color: #DADEE4; font-size: 12px;">
                    © 2024 MTC LTD. All rights reserved. | Engineered with precision and excellence.
                </p>
            </div>
        </div>
    </body>
    </html>
    """

def initialize_data():
    """Initialize default data"""
    # Initialize admin user
    admins = read_json_file('admins.json')
    if not admins:
        admin_user = {
            'id': str(uuid.uuid4()),
            'email': 'admin@mtcltd.com',
            'password': 'admin123',
            'role': 'admin',
            'created_at': datetime.now().isoformat()
        }
        write_json_file('admins.json', [admin_user])
    
    # Initialize users file
    users = read_json_file('users.json')
    if not users:
        # Add demo user
        demo_user = {
            'id': str(uuid.uuid4()),
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'test@example.com',
            'password': '123',
            'company': 'Demo Corp',
            'created_at': datetime.now().isoformat()
        }
        write_json_file('users.json', [demo_user])

# Initialize data on startup
initialize_data()

# Auth Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration"""
    try:
        data = request.get_json()
        
        required_fields = ['firstName', 'lastName', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        users = read_json_file('users.json')
        
        # Check if user exists
        if any(user['email'] == data['email'] for user in users):
            return jsonify({'error': 'User already exists'}), 400
        
        # Create new user
        user = {
            'id': str(uuid.uuid4()),
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'email': data['email'],
            'password': data['password'],
            'company': data.get('company', ''),
            'created_at': datetime.now().isoformat()
        }
        
        users.append(user)
        write_json_file('users.json', users)
        
        return jsonify({'message': 'Registration successful', 'user_id': user['id']}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        users = read_json_file('users.json')
        
        # Find user
        user = next((u for u in users if u['email'] == email and u['password'] == password), None)
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'email': user['email'],
                'firstName': user['firstName'],
                'lastName': user['lastName']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quote', methods=['POST'])
def submit_quote():
    """Submit quote request"""
    try:
        data = request.get_json()
        
        required_fields = ['firstName', 'lastName', 'email', 'company']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        quotes = read_json_file('quotes.json')
        
        quote = {
            'id': str(uuid.uuid4()),
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'email': data['email'],
            'phone': data.get('phone', ''),
            'company': data['company'],
            'projectTitle': data.get('projectTitle', ''),
            'projectDescription': data.get('projectDescription', ''),
            'requirements': data.get('requirements', ''),
            'timeline': data.get('timeline', ''),
            'budget': data.get('budget', ''),
            'services': data.get('services', []),
            'projectSize': data.get('projectSize', ''),
            'description': data.get('description', ''),
            'additionalInfo': data.get('additionalInfo', ''),
            'estimatedCost': data.get('estimatedCost', 0),
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        
        quotes.append(quote)
        write_json_file('quotes.json', quotes)
        
        return jsonify({'message': 'Quote request submitted successfully', 'id': quote['id']}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/client/dashboard', methods=['GET'])
def get_client_dashboard():
    """Get client dashboard data"""
    try:
        email = request.args.get('email')
        if not email:
            return jsonify({'error': 'Email parameter required'}), 400
        
        # Sample project data for demo
        projects = [
            {
                'id': '1',
                'name': 'Enterprise CRM System',
                'service': 'Software Development',
                'status': 'in-progress',
                'progress': 75,
                'teamMembers': 8,
                'daysLeft': 45,
                'paymentBreakdown': [
                    {'category': 'Development', 'amount': 80000},
                    {'category': 'Design & UX', 'amount': 25000},
                    {'category': 'Testing & QA', 'amount': 15000},
                    {'category': 'Project Management', 'amount': 10000}
                ]
            },
            {
                'id': '2',
                'name': 'Security Audit',
                'service': 'Cybersecurity',
                'status': 'completed',
                'progress': 100,
                'teamMembers': 4,
                'daysLeft': 0,
                'paymentBreakdown': [
                    {'category': 'Security Assessment', 'amount': 20000},
                    {'category': 'Penetration Testing', 'amount': 15000},
                    {'category': 'Compliance Review', 'amount': 10000}
                ]
            }
        ]
        
        quotes = read_json_file('quotes.json')
        user_quotes = [q for q in quotes if q['email'] == email]
        
        return jsonify({
            'projects': projects,
            'quotes': user_quotes
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/users', methods=['GET'])
def get_users():
    """Get all registered users"""
    try:
        users = read_json_file('users.json')
        return jsonify(users), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/quotes', methods=['GET'])
def get_quotes():
    """Get all quote requests"""
    try:
        quotes = read_json_file('quotes.json')
        return jsonify(quotes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/send-quote', methods=['POST'])
def send_quote_email():
    """Send quote email to client"""
    try:
        data = request.get_json()
        
        required_fields = ['clientEmail', 'clientName', 'subject', 'quoteAmount', 'projectDetails']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Generate HTML email
        html_content = generate_quote_email_html(
            data['clientName'],
            int(data['quoteAmount']),
            data['projectDetails'],
            data.get('paymentBreakdown', 'Payment breakdown will be provided upon project confirmation.')
        )
        
        # Send email (in demo mode, we'll just log it)
        print(f"Sending email to: {data['clientEmail']}")
        print(f"Subject: {data['subject']}")
        print("Email content generated successfully")
        
        # Send actual email
        success = send_email(data['clientEmail'], data['subject'], html_content)
        
        if success:
            return jsonify({'message': 'Quote email sent successfully'}), 200
        else:
            return jsonify({'error': 'Failed to send email'}), 500
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    """Admin login"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        admins = read_json_file('admins.json')
        
        admin = next((a for a in admins if a['email'] == email and a['password'] == password), None)
        
        if not admin:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': admin['id'],
                'email': admin['email'],
                'role': admin['role']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/dashboard', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics"""
    try:
        inquiries = read_json_file('inquiries.json')
        applicants = read_json_file('applicants.json')
        quotes = read_json_file('quotes.json')
        users = read_json_file('users.json')
        
        stats = {
            'total_inquiries': len(inquiries),
            'pending_inquiries': len([i for i in inquiries if i['status'] == 'pending']),
            'total_applicants': len(applicants),
            'pending_applicants': len([a for a in applicants if a['status'] == 'pending']),
            'shortlisted_applicants': len([a for a in applicants if a['status'] == 'shortlisted']),
            'total_quotes': len(quotes),
            'total_users': len(users),
            'recent_inquiries': sorted(inquiries, key=lambda x: x['created_at'], reverse=True)[:5],
            'recent_applicants': sorted(applicants, key=lambda x: x['created_at'], reverse=True)[:5]
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/projects', methods=['GET'])
def get_projects():
    """Get all projects"""
    try:
        projects = read_json_file('projects.json')
        if not projects:
            # Initialize with demo data
            demo_projects = [
                {
                    'id': '1',
                    'name': 'Enterprise Banking Platform',
                    'client': 'Major Financial Institution',
                    'clientEmail': 'project.manager@bank.com',
                    'status': 'In Progress',
                    'progress': 75,
                    'teamSize': 12,
                    'budget': 850000,
                    'startDate': '2024-01-15',
                    'endDate': '2024-07-15',
                    'daysRemaining': 45,
                    'technologies': ['React', 'Node.js', 'PostgreSQL', 'AWS'],
                    'description': 'Complete digital transformation of core banking systems with modern web interface and API integration.',
                    'created_at': datetime.now().isoformat()
                },
                {
                    'id': '2',
                    'name': 'Government Security System',
                    'client': 'Federal Agency',
                    'clientEmail': 'security.lead@gov.agency',
                    'status': 'Planning',
                    'progress': 15,
                    'teamSize': 8,
                    'budget': 1200000,
                    'startDate': '2024-03-01',
                    'endDate': '2025-03-01',
                    'daysRemaining': 180,
                    'technologies': ['Java', 'Spring', 'Oracle', 'Docker'],
                    'description': 'High-security system for classified data management with advanced encryption and audit trails.',
                    'created_at': datetime.now().isoformat()
                },
                {
                    'id': '3',
                    'name': 'Healthcare Analytics Platform',
                    'client': 'Healthcare Network',
                    'clientEmail': 'analytics@healthcare.com',
                    'status': 'In Progress',
                    'progress': 60,
                    'teamSize': 6,
                    'budget': 450000,
                    'startDate': '2024-02-01',
                    'endDate': '2024-08-01',
                    'daysRemaining': 90,
                    'technologies': ['Python', 'TensorFlow', 'React', 'MongoDB'],
                    'description': 'AI-powered analytics platform for patient data analysis and predictive healthcare insights.',
                    'created_at': datetime.now().isoformat()
                }
            ]
            write_json_file('projects.json', demo_projects)
            projects = demo_projects
        return jsonify(projects), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    """Get all job openings"""
    try:
        jobs = read_json_file('jobs.json')
        if not jobs:
            # Initialize with demo data
            demo_jobs = [
                {
                    'id': '1',
                    'title': 'Senior Full Stack Developer',
                    'department': 'Software Development',
                    'location': 'New York, NY / Remote',
                    'type': 'Full-time',
                    'salary': '$120,000 - $180,000',
                    'description': 'Lead development of enterprise-grade applications for Fortune 500 clients using React, Node.js, and cloud technologies.',
                    'requirements': [
                        '5+ years full-stack development experience',
                        'Expert in React, Node.js, TypeScript',
                        'Experience with AWS/Azure cloud platforms',
                        'Strong system design and architecture skills',
                        'Experience with microservices and APIs'
                    ],
                    'created_at': datetime.now().isoformat()
                },
                {
                    'id': '2',
                    'title': 'Cybersecurity Specialist',
                    'department': 'Cybersecurity',
                    'location': 'Washington, DC',
                    'type': 'Full-time',
                    'salary': '$130,000 - $200,000',
                    'description': 'Implement security solutions for government and enterprise clients, conduct penetration testing and security audits.',
                    'requirements': [
                        'CISSP, CEH, or equivalent certifications',
                        '4+ years cybersecurity experience',
                        'Experience with penetration testing tools',
                        'Knowledge of compliance frameworks (SOC2, HIPAA)',
                        'Government clearance preferred'
                    ],
                    'created_at': datetime.now().isoformat()
                }
            ]
            write_json_file('jobs.json', demo_jobs)
            jobs = demo_jobs
        return jsonify(jobs), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects', methods=['GET'])
def get_public_projects():
    """Get public project information for careers page"""
    try:
        projects = read_json_file('projects.json')
        # Return limited public info
        public_projects = []
        for project in projects:
            public_projects.append({
                'id': project['id'],
                'name': project['name'],
                'client': project['client'],
                'duration': f"{project.get('daysRemaining', 90)} days",
                'teamSize': project['teamSize'],
                'technologies': project['technologies'],
                'status': project['status'],
                'completionDays': project.get('daysRemaining', 90)
            })
        return jsonify(public_projects), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/test-email', methods=['POST'])
def test_email():
    """Test email sending"""
    try:
        success = send_email(
            'ianmabruk3@gmail.com',
            'MTC LTD Email Test',
            '<h1>Email system working!</h1><p>Your email configuration is successful.</p>'
        )
        if success:
            return jsonify({'message': 'Test email sent successfully'}), 200
        else:
            return jsonify({'error': 'Failed to send test email'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/apply', methods=['POST'])
def submit_application():
    """Submit job application"""
    try:
        # Handle file upload
        if 'cv' not in request.files:
            return jsonify({'error': 'CV file is required'}), 400
        
        cv_file = request.files['cv']
        if cv_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if cv_file and allowed_file(cv_file.filename):
            filename = secure_filename(cv_file.filename)
            unique_filename = f"{uuid.uuid4()}_{filename}"
            cv_file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
        
        applications = read_json_file('applications.json')
        
        application = {
            'id': str(uuid.uuid4()),
            'jobId': request.form.get('jobId'),
            'firstName': request.form.get('firstName'),
            'lastName': request.form.get('lastName'),
            'email': request.form.get('email'),
            'phone': request.form.get('phone'),
            'coverLetter': request.form.get('coverLetter'),
            'cvFilename': unique_filename,
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        
        applications.append(application)
        write_json_file('applications.json', applications)
        
        return jsonify({'message': 'Application submitted successfully', 'id': application['id']}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print("🚀 Starting MTC LTD Backend Server...")
    print(f"🌐 Server running on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)