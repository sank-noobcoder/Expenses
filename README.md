# HostelSpend 🏠💰

A modern, responsive expense tracking application designed specifically for students managing their hostel expenses. Built with React, TypeScript, and Tailwind CSS.


## ✨ Features

### Core Functionality
- **Budget Management**: Set and track monthly budgets (default ₹4,000)
- **Expense Tracking**: Add expenses with categories (Food, Stationery, Travel, Misc)
- **Visual Dashboard**: Beautiful gradient cards showing budget overview, spending progress, and daily allowance
- **Recent Expenses**: View and manage your recent transactions
- **Category-wise Organization**: Track spending across different categories with color-coded badges
- **Responsive Design**: Mobile-first design that works perfectly on all devices

### Authentication
- Email & Password login
- Phone number authentication support
- Guest mode for quick access
- Secure signup flow

### Settings
- Customizable monthly budget
- Adjustable billing cycle start date
- Notification preferences (Push & Email)

### History & Reports
- Monthly expense history
- Budget vs. actual spending comparison
- Downloadable PDF reports (coming soon)

## 🎨 Design System

The app features a modern Indian fintech-inspired design with:
- **Teal/Blue gradient** primary colors
- **Success Green** for savings indicators
- **Warning Amber** for budget alerts
- **Smooth animations** and transitions
- **Card-based layouts** with subtle shadows
- **Light/Dark mode** support

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd hostelspend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   ├── BudgetOverview.tsx
│   ├── CategoryBadge.tsx
│   ├── ExpenseCard.tsx
│   ├── ExpenseList.tsx
│   └── Navbar.tsx
├── lib/                # Utility functions
│   ├── types.ts        # TypeScript interfaces
│   ├── currency.ts     # Currency formatting
│   └── date.ts         # Date utilities
├── pages/              # Application pages
│   ├── Landing.tsx     # Homepage
│   ├── Dashboard.tsx   # Main dashboard
│   ├── AddExpense.tsx  # Add expense form
│   ├── Login.tsx       # Authentication
│   ├── Signup.tsx      # User registration
│   ├── Settings.tsx    # App settings
│   └── History.tsx     # Expense history
└── App.tsx             # Root component & routing
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner toasts
- **Charts**: Recharts (for visualizations)

## 🎯 Roadmap

### Backend Integration (Next Steps)
- [ ] Connect to Lovable Cloud/Supabase
- [ ] User authentication & profiles
- [ ] Persistent expense storage
- [ ] Cloud-based receipt uploads

### Advanced Features
- [ ] PDF report generation
- [ ] Email notifications at budget thresholds (50%, 90%)
- [ ] Web Push notifications
- [ ] Monthly bill sharing
- [ ] Advanced filtering & search
- [ ] Category-wise spending analytics
- [ ] Budget forecasting
- [ ] Multi-currency support

## 📱 Mobile Support

The app is fully responsive and works seamlessly on:
- 📱 Mobile phones (iOS & Android)
- 📱 Tablets
- 💻 Desktop browsers

## 🔒 Security & Privacy

- Client-side data validation
- Secure authentication flow (ready for backend)
- No sensitive data logged to console
- HTTPS recommended for production

## 🌐 SEO Optimized

- Semantic HTML5 structure
- Comprehensive meta tags
- Open Graph & Twitter cards
- JSON-LD structured data
- Mobile-friendly design
- Fast loading performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is built with Lovable and is open for educational purposes.

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

---

**Built for students, by sanket** 🎓

For any questions or support, feel free to reach out!
