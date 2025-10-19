import React, { useState } from 'react';
import { Calendar, Users, Briefcase, Package, DollarSign, FileText, BarChart3, CheckSquare, Plus, Edit2, Trash2, Eye, Download, Menu, X, Save, XCircle, TrendingUp, Building2, Receipt, AlertCircle } from 'lucide-react';

const ConstructionApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState({ id: 1, name: 'Admin', role: 'owner' });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // State Management
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'Government School Building', 
      client: 'State PWD Department', 
      status: 'In Progress', 
      budget: 5000000, 
      spent: 3200000, 
      startDate: '2024-09-01', 
      endDate: '2025-03-01', 
      completion: 65,
      assignedEngineers: [1, 2],
      location: 'Mumbai, Maharashtra'
    },
    { 
      id: 2, 
      name: 'Highway Construction - NH47', 
      client: 'National Highways Authority', 
      status: 'Planning', 
      budget: 12000000, 
      spent: 500000, 
      startDate: '2024-11-01', 
      endDate: '2026-08-01', 
      completion: 5,
      assignedEngineers: [1],
      location: 'Pune, Maharashtra'
    },
  ]);

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Rajesh Kumar', role: 'Site Engineer', phone: '9876543210', email: 'rajesh@example.com', status: 'Active', salary: 45000, joinDate: '2023-01-15' },
    { id: 2, name: 'Priya Sharma', role: 'Site Engineer', phone: '9876543211', email: 'priya@example.com', status: 'Active', salary: 42000, joinDate: '2023-03-20' },
    { id: 3, name: 'Amit Patel', role: 'Mason', phone: '9876543212', email: 'amit@example.com', status: 'Active', salary: 25000, joinDate: '2023-06-10' },
    { id: 4, name: 'Sunita Desai', role: 'Office Staff', phone: '9876543213', email: 'sunita@example.com', status: 'Active', salary: 30000, joinDate: '2023-02-05' },
  ]);

  const [attendance, setAttendance] = useState([
    { id: 1, employeeId: 1, employeeName: 'Rajesh Kumar', projectId: 1, date: '2024-10-19', checkIn: '08:00', checkOut: '17:00', hours: 9, status: 'Present' },
    { id: 2, employeeId: 2, employeeName: 'Priya Sharma', projectId: 1, date: '2024-10-19', checkIn: '08:15', checkOut: '17:00', hours: 8.75, status: 'Present' },
    { id: 3, employeeId: 3, employeeName: 'Amit Patel', projectId: 2, date: '2024-10-19', checkIn: '08:00', checkOut: '16:30', hours: 8.5, status: 'Present' },
  ]);

  // Project-specific inventory
  const [inventory, setInventory] = useState([
    { id: 1, projectId: 1, name: 'Cement Bags (50kg)', quantity: 150, unit: 'bags', rate: 350, reorderLevel: 50, location: 'Site Storage', lastUpdated: '2024-10-18' },
    { id: 2, projectId: 1, name: 'Steel Rods (12mm)', quantity: 200, unit: 'pieces', rate: 450, reorderLevel: 100, location: 'Site B', lastUpdated: '2024-10-17' },
    { id: 3, projectId: 2, name: 'Concrete Mixer', quantity: 3, unit: 'units', rate: 45000, reorderLevel: 1, location: 'Equipment Yard', lastUpdated: '2024-10-15' },
  ]);

  // Site engineer expenses per project
  const [engineerExpenses, setEngineerExpenses] = useState([
    { id: 1, projectId: 1, engineerId: 1, engineerName: 'Rajesh Kumar', category: 'Travel', amount: 2500, date: '2024-10-15', description: 'Site visit fuel', status: 'Approved' },
    { id: 2, projectId: 1, engineerId: 1, engineerName: 'Rajesh Kumar', category: 'Materials', amount: 15000, date: '2024-10-16', description: 'Emergency cement purchase', status: 'Pending' },
    { id: 3, projectId: 2, engineerId: 2, engineerName: 'Priya Sharma', category: 'Equipment Rental', amount: 8500, date: '2024-10-17', description: 'Excavator rental for 2 days', status: 'Approved' },
  ]);

  // Project expenses
  const [projectExpenses, setProjectExpenses] = useState([
    { id: 1, projectId: 1, category: 'Labor', amount: 250000, date: '2024-10-01', description: 'Monthly labor payment', billNumber: 'LAB-001', paymentStatus: 'Paid' },
    { id: 2, projectId: 1, category: 'Materials', amount: 180000, date: '2024-10-05', description: 'Cement and steel purchase', billNumber: 'MAT-001', paymentStatus: 'Paid' },
    { id: 3, projectId: 2, category: 'Equipment', amount: 95000, date: '2024-10-10', description: 'Excavator and loader rental', billNumber: 'EQP-001', paymentStatus: 'Pending' },
  ]);

  // Government bill tracking
  const [governmentBills, setGovernmentBills] = useState([
    { 
      id: 1, 
      projectId: 1, 
      projectName: 'Government School Building',
      billNumber: 'GOV-BILL-001', 
      amount: 1500000, 
      workCompleted: 'Foundation and ground floor structure',
      submissionDate: '2024-09-15', 
      approvalDate: '2024-09-25',
      paymentDate: '2024-10-05',
      status: 'Paid',
      remarks: 'Payment received on time'
    },
    { 
      id: 2, 
      projectId: 1, 
      projectName: 'Government School Building',
      billNumber: 'GOV-BILL-002', 
      amount: 1700000, 
      workCompleted: 'First floor construction and roofing',
      submissionDate: '2024-10-10', 
      approvalDate: null,
      paymentDate: null,
      status: 'Submitted',
      remarks: 'Awaiting approval from department'
    },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 1, projectId: 1, projectName: 'Government School Building', client: 'State PWD Department', amount: 1500000, date: '2024-10-01', status: 'Paid', dueDate: '2024-10-15' },
    { id: 2, projectId: 1, projectName: 'Government School Building', client: 'State PWD Department', amount: 1200000, date: '2024-10-15', status: 'Pending', dueDate: '2024-10-30' },
  ]);

  const [quotes, setQuotes] = useState([
    { id: 1, client: 'Municipal Corporation', project: 'Warehouse Construction', amount: 8500000, date: '2024-10-15', validUntil: '2024-11-15', status: 'Pending' },
    { id: 2, client: 'State Transport Department', project: 'Bus Stand Renovation', amount: 3500000, date: '2024-10-10', validUntil: '2024-11-10', status: 'Accepted' },
  ]);

  // Helper functions
  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const getEngineerName = (engineerId) => {
    const engineer = employees.find(e => e.id === engineerId);
    return engineer ? engineer.name : 'Unknown Engineer';
  };

  const getAssignedEngineers = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];
    return employees.filter(e => project.assignedEngineers.includes(e.id));
  };

  const getTotalProjectExpenses = (projectId) => {
    const directExpenses = projectExpenses.filter(e => e.projectId === projectId).reduce((sum, e) => sum + e.amount, 0);
    const engineerExp = engineerExpenses.filter(e => e.projectId === projectId && e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);
    return directExpenses + engineerExp;
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['owner', 'office_staff', 'site_engineer'] },
    { id: 'projects', label: 'Projects', icon: Briefcase, roles: ['owner', 'office_staff', 'site_engineer'] },
    { id: 'employees', label: 'Employees', icon: Users, roles: ['owner', 'office_staff'] },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare, roles: ['owner', 'office_staff', 'site_engineer'] },
    { id: 'inventory', label: 'Inventory', icon: Package, roles: ['owner', 'office_staff', 'site_engineer'] },
    { id: 'expenses', label: 'Expenses', icon: Receipt, roles: ['owner', 'office_staff', 'site_engineer'] },
    { id: 'government-bills', label: 'Government Bills', icon: Building2, roles: ['owner', 'office_staff'] },
    { id: 'invoices', label: 'Invoices', icon: DollarSign, roles: ['owner', 'office_staff'] },
    { id: 'quotes', label: 'Quotes', icon: FileText, roles: ['owner', 'office_staff'] },
  ];

  // Modal Component
  const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  // Dashboard View
  const DashboardView = () => {
    const activeProjects = projects.filter(p => p.status === 'In Progress').length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
    const pendingBills = governmentBills.filter(b => b.status === 'Submitted' || b.status === 'Approved').length;
    const todayAttendance = attendance.filter(a => a.status === 'Present').length;

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Projects</p>
                <p className="text-4xl font-bold mt-2">{activeProjects}</p>
              </div>
              <Briefcase size={48} className="opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Today's Attendance</p>
                <p className="text-4xl font-bold mt-2">{todayAttendance}/{employees.length}</p>
              </div>
              <Users size={48} className="opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending Gov. Bills</p>
                <p className="text-4xl font-bold mt-2">{pendingBills}</p>
              </div>
              <Building2 size={48} className="opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Budget</p>
                <p className="text-4xl font-bold mt-2">₹{(totalBudget / 10000000).toFixed(1)}Cr</p>
              </div>
              <DollarSign size={48} className="opacity-80" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Active Projects Status</h2>
            <div className="space-y-4">
              {projects.filter(p => p.status === 'In Progress').map(project => (
                <div key={project.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{project.completion}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2 transition-all" style={{ width: `${project.completion}%` }}></div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Budget: ₹{project.budget.toLocaleString()} | Spent: ₹{project.spent.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Government Bills</h2>
            <div className="space-y-3">
              {governmentBills.slice(0, 5).map(bill => (
                <div key={bill.id} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{bill.billNumber}</h3>
                      <p className="text-sm text-gray-600">{bill.projectName}</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">₹{bill.amount.toLocaleString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      bill.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bill.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Projects View with Create/Edit
  const ProjectsView = () => {
    const [formData, setFormData] = useState({
      name: '', client: '', status: 'Planning', budget: '', 
      startDate: '', endDate: '', location: '', assignedEngineers: []
    });

    const openModal = (type, item = null) => {
      setModalType(type);
      if (item) {
        setEditingItem(item);
        setFormData(item);
      } else {
        setFormData({
          name: '', client: '', status: 'Planning', budget: '', 
          startDate: '', endDate: '', location: '', assignedEngineers: []
        });
      }
      setShowModal(true);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        setProjects(projects.map(p => p.id === editingItem.id ? { ...formData, id: editingItem.id, spent: editingItem.spent, completion: editingItem.completion } : p));
      } else {
        setProjects([...projects, { ...formData, id: Date.now(), spent: 0, completion: 0 }]);
      }
      setShowModal(false);
      setEditingItem(null);
    };

    const deleteProject = (id) => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        setProjects(projects.filter(p => p.id !== id));
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Projects Management</h1>
          <button onClick={() => openModal('create')} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
            <Plus size={20} /> New Project
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map(project => {
            const totalExpenses = getTotalProjectExpenses(project.id);
            const assignedEngineers = getAssignedEngineers(project.id);
            
            return (
              <div key={project.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{project.name}</h3>
                    <p className="text-gray-600 mt-1">{project.client}</p>
                    <p className="text-sm text-gray-500 mt-1">📍 {project.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.status}
                    </span>
                    <button onClick={() => openModal('edit', project)} className="text-blue-500 hover:text-blue-600 p-2"><Edit2 size={18} /></button>
                    <button onClick={() => deleteProject(project.id)} className="text-red-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs text-blue-600 font-medium">Budget</p>
                    <p className="text-lg font-bold text-gray-800">₹{project.budget.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-xs text-red-600 font-medium">Spent</p>
                    <p className="text-lg font-bold text-gray-800">₹{totalExpenses.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-xs text-green-600 font-medium">Remaining</p>
                    <p className="text-lg font-bold text-gray-800">₹{(project.budget - totalExpenses).toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-xs text-purple-600 font-medium">Completion</p>
                    <p className="text-lg font-bold text-gray-800">{project.completion}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.completion}% Complete</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-3 transition-all" style={{ width: `${project.completion}%` }}></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Start:</span>
                    <span className="ml-2 font-medium">{project.startDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">End:</span>
                    <span className="ml-2 font-medium">{project.endDate}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-600">Assigned Engineers:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {assignedEngineers.map(eng => (
                        <span key={eng.id} className="bg-gray-100 px-2 py-1 rounded text-xs">{eng.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showModal && (
          <Modal title={editingItem ? 'Edit Project' : 'Create New Project'} onClose={() => setShowModal(false)}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input type="text" required value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                  <input type="number" required value={formData.budget} onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" required value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Site Engineers</label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
                  {employees.filter(e => e.role === 'Site Engineer').map(eng => (
                    <label key={eng.id} className="flex items-center gap-2">
                      <input type="checkbox" checked={(formData.assignedEngineers || []).includes(eng.id)} onChange={(e) => {
                        const current = formData.assignedEngineers || [];
                        setFormData({
                          ...formData, 
                          assignedEngineers: e.target.checked ? [...current, eng.id] : current.filter(id => id !== eng.id)
                        });
                      }} />
                      <span className="text-sm">{eng.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
                  <Save size={18} /> {editingItem ? 'Update' : 'Create'} Project
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  };

  // Expenses View
  const ExpensesView = () => {
    const [activeTab, setActiveTab] = useState('project');
    const [formData, setFormData] = useState({ projectId: '', category: '', amount: '', date: '', description: '', billNumber: '' });
    const [engineerExpenseForm, setEngineerExpenseForm] = useState({ projectId: '', engineerId: '', category: '', amount: '', date: '', description: '' });

    const handleProjectExpenseSubmit = (e) => {
      e.preventDefault();
      setProjectExpenses([...projectExpenses, { ...formData, id: Date.now(), paymentStatus: 'Pending' }]);
      setShowModal(false);
      setFormData({ projectId: '', category: '', amount: '', date: '', description: '', billNumber: '' });
    };

    const handleEngineerExpenseSubmit = (e) => {
      e.preventDefault();
      const engineer = employees.find(emp => emp.id === parseInt(engineerExpenseForm.engineerId));
      setEngineerExpenses([...engineerExpenses, { 
        ...engineerExpenseForm, 
        id: Date.now(), 
        engineerName: engineer.name,
        status: 'Pending' 
      }]);
      setShowModal(false);
      setEngineerExpenseForm({ projectId: '', engineerId: '', category: '', amount: '', date: '', description: '' });
    };

    const approveExpense = (id) => {
      setEngineerExpenses(engineerExpenses.map(exp => 
        exp.id === id ? { ...exp, status: 'Approved' } : exp
      ));
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Expense Tracking</h1>
          <div className="flex gap-2">
            <button onClick={() => { setModalType('project-expense'); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
              <Plus size={20} /> Project Expense
            </button>
            <button onClick={() => { setModalType('engineer-expense'); setShowModal(true); }} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
              <Plus size={20} /> Engineer Expense
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b flex">
            <button onClick={() => setActiveTab('project')} className={`px-6 py-3 font-medium ${activeTab === 'project' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}>
              Project Expenses
            </button>
            <button onClick={() => setActiveTab('engineer')} className={`px-6 py-3 font-medium ${activeTab === 'engineer' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}>
              Site Engineer Expenses
            </button>
            <button onClick={() => setActiveTab('summary')} className={`px-6 py-3 font-medium ${activeTab === 'summary' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}>
              Project Summary
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'project' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill Number</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projectExpenses.map(exp => (
                      <tr key={exp.id}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{getProjectName(exp.projectId)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.billNumber}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{exp.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${exp.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {exp.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'engineer' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engineer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {engineerExpenses.map(exp => (
                      <tr key={exp.id}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{getProjectName(exp.projectId)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.engineerName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.category}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{exp.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${exp.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {exp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{exp.description}</td>
                        <td className="px-4 py-3">
                          {exp.status === 'Pending' && (
                            <button onClick={() => approveExpense(exp.id)} className="text-green-500 hover:text-green-600 text-xs font-medium">
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'summary' && (
              <div className="space-y-4">
                {projects.map(project => {
                  const projectExp = projectExpenses.filter(e => e.projectId === project.id).reduce((sum, e) => sum + e.amount, 0);
                  const engineerExp = engineerExpenses.filter(e => e.projectId === project.id && e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);
                  const total = projectExp + engineerExp;
                  
                  return (
                    <div key={project.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{project.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                          <p className="text-sm text-gray-600">Project Expenses</p>
                          <p className="text-2xl font-bold text-blue-600">₹{projectExp.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                          <p className="text-sm text-gray-600">Engineer Expenses</p>
                          <p className="text-2xl font-bold text-green-600">₹{engineerExp.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                          <p className="text-sm text-gray-600">Total Expenses</p>
                          <p className="text-2xl font-bold text-purple-600">₹{total.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                          <p className="text-sm text-gray-600">Budget Remaining</p>
                          <p className="text-2xl font-bold text-orange-600">₹{(project.budget - total).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {showModal && modalType === 'project-expense' && (
          <Modal title="Add Project Expense" onClose={() => setShowModal(false)}>
            <form onSubmit={handleProjectExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select required value={formData.projectId} onChange={(e) => setFormData({...formData, projectId: parseInt(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select Category</option>
                  <option value="Labor">Labor</option>
                  <option value="Materials">Materials</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Transport">Transport</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input type="number" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bill Number</label>
                <input type="text" required value={formData.billNumber} onChange={(e) => setFormData({...formData, billNumber: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" rows="3"></textarea>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
                  <Save size={18} /> Add Expense
                </button>
              </div>
            </form>
          </Modal>
        )}

        {showModal && modalType === 'engineer-expense' && (
          <Modal title="Add Site Engineer Expense" onClose={() => setShowModal(false)}>
            <form onSubmit={handleEngineerExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select required value={engineerExpenseForm.projectId} onChange={(e) => setEngineerExpenseForm({...engineerExpenseForm, projectId: parseInt(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Engineer</label>
                <select required value={engineerExpenseForm.engineerId} onChange={(e) => setEngineerExpenseForm({...engineerExpenseForm, engineerId: parseInt(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select Engineer</option>
                  {employees.filter(e => e.role === 'Site Engineer').map(eng => <option key={eng.id} value={eng.id}>{eng.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select required value={engineerExpenseForm.category} onChange={(e) => setEngineerExpenseForm({...engineerExpenseForm, category: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select Category</option>
                  <option value="Travel">Travel</option>
                  <option value="Materials">Materials</option>
                  <option value="Equipment Rental">Equipment Rental</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input type="number" required value={engineerExpenseForm.amount} onChange={(e) => setEngineerExpenseForm({...engineerExpenseForm, amount: parseFloat(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" required value={engineerExpenseForm.date} onChange={(e) => setEngineerExpenseForm({...engineerExpenseForm, date: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required value={engineerExpenseForm.description} onChange={(e) => setEngineerExpenseForm({...engineerExpenseForm, description: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" rows="3"></textarea>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2">
                  <Save size={18} /> Submit for Approval
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  };

  // Government Bills View
  const GovernmentBillsView = () => {
    const [billForm, setBillForm] = useState({ projectId: '', billNumber: '', amount: '', workCompleted: '', submissionDate: '', remarks: '' });

    const handleBillSubmit = (e) => {
      e.preventDefault();
      const project = projects.find(p => p.id === parseInt(billForm.projectId));
      setGovernmentBills([...governmentBills, { 
        ...billForm, 
        id: Date.now(), 
        projectName: project.name,
        status: 'Submitted',
        approvalDate: null,
        paymentDate: null
      }]);
      setShowModal(false);
      setBillForm({ projectId: '', billNumber: '', amount: '', workCompleted: '', submissionDate: '', remarks: '' });
    };

    const updateBillStatus = (id, status, field) => {
      const today = new Date().toISOString().split('T')[0];
      setGovernmentBills(governmentBills.map(bill => 
        bill.id === id ? { 
          ...bill, 
          status,
          [field]: today
        } : bill
      ));
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Government Bills Tracking</h1>
          <button onClick={() => { setModalType('gov-bill'); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <Plus size={20} /> Submit New Bill
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-700 text-sm font-medium">Submitted</p>
            <p className="text-2xl font-bold text-gray-800">{governmentBills.filter(b => b.status === 'Submitted').length}</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700 text-sm font-medium">Approved</p>
            <p className="text-2xl font-bold text-gray-800">{governmentBills.filter(b => b.status === 'Approved').length}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 text-sm font-medium">Paid</p>
            <p className="text-2xl font-bold text-gray-800">{governmentBills.filter(b => b.status === 'Paid').length}</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-purple-700 text-sm font-medium">Total Amount</p>
            <p className="text-2xl font-bold text-gray-800">₹{(governmentBills.reduce((sum, b) => sum + b.amount, 0) / 10000000).toFixed(2)}Cr</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Work Completed</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approved</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {governmentBills.map(bill => (
                <tr key={bill.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{bill.billNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{bill.projectName}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{bill.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{bill.workCompleted}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{bill.submissionDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{bill.approvalDate || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{bill.paymentDate || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      bill.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {bill.status === 'Submitted' && (
                        <button onClick={() => updateBillStatus(bill.id, 'Approved', 'approvalDate')} className="text-blue-500 hover:text-blue-600 text-xs px-2 py-1 border border-blue-300 rounded">
                          Approve
                        </button>
                      )}
                      {bill.status === 'Approved' && (
                        <button onClick={() => updateBillStatus(bill.id, 'Paid', 'paymentDate')} className="text-green-500 hover:text-green-600 text-xs px-2 py-1 border border-green-300 rounded">
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && modalType === 'gov-bill' && (
          <Modal title="Submit Government Bill" onClose={() => setShowModal(false)}>
            <form onSubmit={handleBillSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select required value={billForm.projectId} onChange={(e) => setBillForm({...billForm, projectId: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Number</label>
                  <input type="text" required value={billForm.billNumber} onChange={(e) => setBillForm({...billForm, billNumber: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" placeholder="GOV-BILL-003" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input type="number" required value={billForm.amount} onChange={(e) => setBillForm({...billForm, amount: parseFloat(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                <input type="date" required value={billForm.submissionDate} onChange={(e) => setBillForm({...billForm, submissionDate: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Completed</label>
                <textarea required value={billForm.workCompleted} onChange={(e) => setBillForm({...billForm, workCompleted: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" rows="3" placeholder="Describe the work completed for this bill..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea value={billForm.remarks} onChange={(e) => setBillForm({...billForm, remarks: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" rows="2"></textarea>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
                  <Save size={18} /> Submit Bill
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  };

  // Inventory View (Project-specific)
  const InventoryView = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');
    const [itemForm, setItemForm] = useState({ name: '', quantity: '', unit: '', rate: '', reorderLevel: '', location: '' });

    const handleInventorySubmit = (e) => {
      e.preventDefault();
      const today = new Date().toISOString().split('T')[0];
      setInventory([...inventory, { 
        ...itemForm, 
        id: Date.now(), 
        projectId: parseInt(selectedProject),
        quantity: parseFloat(itemForm.quantity),
        rate: parseFloat(itemForm.rate),
        reorderLevel: parseFloat(itemForm.reorderLevel),
        lastUpdated: today 
      }]);
      setShowModal(false);
      setItemForm({ name: '', quantity: '', unit: '', rate: '', reorderLevel: '', location: '' });
    };

    const projectInventory = inventory.filter(item => item.projectId === parseInt(selectedProject));
    const lowStockItems = projectInventory.filter(item => item.quantity <= item.reorderLevel);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
          <button onClick={() => { setModalType('inventory'); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <Plus size={20} /> Add Item
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-700">Select Project:</label>
            <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} className="border border-gray-300 rounded px-4 py-2">
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {lowStockItems.length > 0 && (
              <div className="ml-auto flex items-center gap-2 text-red-600">
                <AlertCircle size={20} />
                <span className="font-medium">{lowStockItems.length} Low Stock Items</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projectInventory.map(item => (
                <tr key={item.id} className={item.quantity <= item.reorderLevel ? 'bg-red-50' : ''}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.quantity} {item.unit}
                    {item.quantity <= item.reorderLevel && <span className="ml-2 text-red-600 text-xs font-medium">⚠ Low</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">₹{item.rate.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{(item.quantity * item.rate).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.reorderLevel} {item.unit}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-600"><Edit2 size={16} /></button>
                      <button className="text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && modalType === 'inventory' && (
          <Modal title="Add Inventory Item" onClose={() => setShowModal(false)}>
            <form onSubmit={handleInventorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input type="text" required value={itemForm.name} onChange={(e) => setItemForm({...itemForm, name: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" placeholder="e.g., Cement Bags (50kg)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input type="number" required value={itemForm.quantity} onChange={(e) => setItemForm({...itemForm, quantity: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input type="text" required value={itemForm.unit} onChange={(e) => setItemForm({...itemForm, unit: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" placeholder="bags, pieces, kg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate per Unit (₹)</label>
                  <input type="number" required value={itemForm.rate} onChange={(e) => setItemForm({...itemForm, rate: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
                  <input type="number" required value={itemForm.reorderLevel} onChange={(e) => setItemForm({...itemForm, reorderLevel: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                <input type="text" required value={itemForm.location} onChange={(e) => setItemForm({...itemForm, location: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Site Storage, Warehouse A" />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
                  <Save size={18} /> Add Item
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  };

  // Employees View
  const EmployeesView = () => {
    const [empForm, setEmpForm] = useState({ name: '', role: '', phone: '', email: '', salary: '', joinDate: '' });

    const handleEmployeeSubmit = (e) => {
      e.preventDefault();
      setEmployees([...employees, { ...empForm, id: Date.now(), status: 'Active', salary: parseFloat(empForm.salary) }]);
      setShowModal(false);
      setEmpForm({ name: '', role: '', phone: '', email: '', salary: '', joinDate: '' });
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
          <button onClick={() => { setModalType('employee'); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <Plus size={20} /> Add Employee
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{emp.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">₹{emp.salary.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.joinDate}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{emp.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-600"><Eye size={16} /></button>
                      <button className="text-green-500 hover:text-green-600"><Edit2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && modalType === 'employee' && (
          <Modal title="Add Employee" onClose={() => setShowModal(false)}>
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required value={empForm.name} onChange={(e) => setEmpForm({...empForm, name: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select required value={empForm.role} onChange={(e) => setEmpForm({...empForm, role: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Select Role</option>
                  <option value="Site Engineer">Site Engineer</option>
                  <option value="Office Staff">Office Staff</option>
                  <option value="Mason">Mason</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Labor">Labor</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" required value={empForm.phone} onChange={(e) => setEmpForm({...empForm, phone: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required value={empForm.email} onChange={(e) => setEmpForm({...empForm, email: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Salary (₹)</label>
                  <input type="number" required value={empForm.salary} onChange={(e) => setEmpForm({...empForm, salary: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <input type="date" required value={empForm.joinDate} onChange={(e) => setEmpForm({...empForm, joinDate: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
                  <Save size={18} /> Add Employee
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  };

  // Attendance View
  const AttendanceView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Attendance Tracking</h1>
        <button onClick={() => { setModalType('attendance'); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          <Plus size={20} /> Mark Attendance
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex gap-4">
          <input type="date" className="border border-gray-300 rounded px-3 py-2" defaultValue="2024-10-19" />
          <select className="border border-gray-300 rounded px-3 py-2">
            <option value="">All Projects</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.map(record => (
                <tr key={record.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{record.employeeName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{getProjectName(record.projectId)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{record.checkIn}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{record.checkOut}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{record.hours}h</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Invoices View
  const InvoicesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Invoices & Billing</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          <Plus size={20} /> Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">INV-{String(invoice.id).padStart(4, '0')}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{invoice.projectName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{invoice.client}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{invoice.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{invoice.date}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{invoice.dueDate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-600"><Eye size={16} /></button>
                    <button className="text-green-500 hover:text-green-600"><Download size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Quotes View
  const QuotesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Quotes Management</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          <Plus size={20} /> Create Quote
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote #</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quotes.map(quote => (
              <tr key={quote.id}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">QT-{String(quote.id).padStart(4, '0')}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{quote.client}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{quote.project}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{quote.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{quote.date}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{quote.validUntil}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    quote.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                    quote.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-600"><Eye size={16} /></button>
                    <button className="text-green-500 hover:text-green-600"><Download size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'projects': return <ProjectsView />;
      case 'employees': return <EmployeesView />;
      case 'attendance': return <AttendanceView />;
      case 'inventory': return <InventoryView />;
      case 'expenses': return <ExpensesView />;
      case 'government-bills': return <GovernmentBillsView />;
      case 'invoices': return <InvoicesView />;
      case 'quotes': return <QuotesView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} shadow-xl`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h2 className="text-xl font-bold">ConstructPro</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-gray-300">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="mt-4">
          {navItems.filter(item => item.roles.includes(currentUser.role)).map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition ${
                  currentView === item.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Construction Management System</h1>
              <p className="text-sm text-gray-600">Welcome back, {currentUser.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">{currentUser.name}</p>
                <p className="text-sm text-gray-600 capitalize">{currentUser.role.replace('_', ' ')}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default ConstructionApp;
