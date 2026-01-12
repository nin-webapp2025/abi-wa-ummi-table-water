# Demo Mode Documentation

## Overview
This application is currently running in **DEMO MODE** with mock data. This allows you to showcase the full frontend interface to your client without requiring backend infrastructure setup.

## What's Working

### Mock Authentication
- **Login Credentials** (any password will work):
  - **Admin**: `admin@abiwaummi.com` (full access)
  - **Staff**: `staff@abiwaummi.com` (record production/sales)
  - **Viewer**: `viewer@abiwaummi.com` (read-only)

### Mock Data
All pages display realistic sample data:
- **Production Records**: 3 sample records (450-550 bags per day)
- **Sales Records**: 4 sample records (₦20,000 - ₦168,000 revenue)
- **Resources**: 4 inventory items (Nylon Bags, Chlorine, Diesel, Labels)
- **Expenses**: 4 expense records (₦8,000 - ₦30,000)

### Functional Features
✅ User login with role-based access control  
✅ Dashboard with today and month statistics  
✅ Production page - view records and add new production  
✅ Sales page - view records and record new sales  
✅ Revenue page - analytics with charts  
✅ Resources page - inventory tracking  
✅ Settings page - user profile display  
✅ All forms accept input and update mock data arrays  
✅ Data tables display sorted information  
✅ Realistic loading states (300-500ms delays)  

## How It Works

### Service Layer
All services (`productionService`, `salesService`, `resourceService`, `expenseService`) have been modified to use mock data arrays instead of Supabase database calls:

```typescript
// Before (Supabase)
const { data, error } = await supabase.from('sales').select('*');

// After (Mock Data)
await new Promise(resolve => setTimeout(resolve, 300));
return [...MOCK_SALES].sort((a, b) => b.date.localeCompare(a.date));
```

### Data Persistence
⚠️ **Important**: Mock data is stored in memory. Changes persist during the session but **reset on page refresh**.

## Switching to Production Mode

When ready to connect to your Supabase backend:

1. **Revert Service Files** (4 files to update):
   - `src/services/productionService.ts`
   - `src/services/salesService.ts`
   - `src/services/resourceService.ts`
   - `src/services/expenseService.ts`

2. **Update AuthContext**:
   - Change `src/context/AuthContext.tsx`:
   ```typescript
   // Replace this line:
   import { mockAuthService as authService } from '../services/mockAuthService';
   
   // With this line:
   import { authService } from '../services/authService';
   ```

3. **Configure Environment Variables**:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set Up Database**:
   - Follow instructions in `DATABASE_SCHEMA.md`
   - Run the SQL schema in your Supabase SQL Editor
   - Enable Row Level Security policies

## Testing the Demo

### Quick Test Checklist
1. ✅ Open http://localhost:5174 (or the port shown in terminal)
2. ✅ Login as admin: `admin@abiwaummi.com` (any password)
3. ✅ Verify dashboard shows statistics
4. ✅ Navigate to Production page - see 3 records
5. ✅ Add new production record - form should work
6. ✅ Navigate to Sales page - see 4 records
7. ✅ Navigate to Revenue page - see analytics
8. ✅ Navigate to Resources page - see 4 items
9. ✅ Check responsive design on mobile viewport
10. ✅ Logout and login as Staff to see different permissions

### Role-Based Features
- **Admin**: Can access all pages and features
- **Staff**: Cannot access Settings page
- **Viewer**: Read-only access, no forms visible

## Presenting to Client

### Talking Points
1. **Complete UI/UX**: All pages designed and functional
2. **Nigerian Context**: Naira (₦) currency, local date formats
3. **Role-Based Access**: Different user types with appropriate permissions
4. **Mobile Responsive**: Works on all device sizes
5. **Production Ready**: Only backend integration remaining

### Demo Script
1. Start at Login → show authentication
2. Dashboard → highlight key metrics (today/month stats)
3. Production → demonstrate adding new record
4. Sales → show sales tracking with automatic revenue calculation
5. Revenue → analytics view for business insights
6. Resources → inventory management
7. Settings → user profile

### Known Limitations (During Demo)
- Data resets on page refresh
- No actual database persistence
- User profile changes don't save
- All passwords accepted for demo login

## Files Modified for Demo Mode
- `src/services/mockAuthService.ts` (created)
- `src/services/mockData.ts` (created)
- `src/services/productionService.ts` (modified)
- `src/services/salesService.ts` (modified)
- `src/services/resourceService.ts` (modified)
- `src/services/expenseService.ts` (modified)
- `src/context/AuthContext.tsx` (modified to use mockAuthService)

---

**Ready for client demo!** The application is fully functional for showcasing purposes. 🚀
