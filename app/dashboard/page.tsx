"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"

import { Checkbox } from "../components/ui/checkbox"
import { Button } from "../components/ui/button"
import { Settings, X, Loader2 } from "lucide-react"
import { getUsersData } from "../api/usersData";
import { Input } from '@/app/components/ui/input';

interface pageProps {
}

type User = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  role?: string[]
  status?: string
}

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            {user.status && (
              <div className="text-xs text-amber-500">{user.status}</div>
            )}
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-sm text-gray-500">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div className="text-sm">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div className="text-sm">{row.getValue("city")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full p-2 h-8 w-8">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Edit User</span>
          </Button>
          <Button variant="outline" size="sm" className="rounded-full p-2 h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove User</span>
          </Button>
        </div>
      )
    }
  }
]

const page = ({ }: pageProps) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsersData();
        setAllUsers(data);
        setFilteredUsers(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load users data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleSearch = (value: string) => {
    if (value === '') {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(user => 
        user.name.toLowerCase().includes(value.toLowerCase()) || 
        user.city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='mx-4 md:mx-8 lg:mx-16 pt-6 md:pt-10 pb-10'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4'>
          <div>
            <h1 className='text-xl md:text-2xl font-bold text-gray-800'>User Management</h1>
            <h2 className='font-medium text-sm md:text-base text-neutral-400'>dashboard </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Input 
                placeholder="Search by name or city..." 
                className="w-full pl-10" 
                onChange={(e) => handleSearch(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 absolute left-3 top-3 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <Button onClick={() => router.push('/dashboard/add')} className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto">
              + Add User
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="w-full overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-white p-6 rounded-lg shadow">
                <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                <span className="ml-2">Loading users data...</span>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4 bg-white rounded-lg shadow">
                {error}
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <TableHead key={header.id} className="whitespace-nowrap">
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </TableHead>
                            ))}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="whitespace-nowrap">
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={columns.length}
                              className="h-24 text-center"
                            >
                              No users found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                  <div className="text-sm text-gray-500 text-center sm:text-left">
                    Showing {filteredUsers.length} of {allUsers.length} total Users
                  </div>
                  <div className="flex items-center flex-wrap justify-center gap-2">
                    <Button variant="outline" size="sm" disabled className="hidden sm:inline-flex">First</Button>
                    <Button variant="outline" size="sm" disabled>{"<"}</Button>
                    <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
                    <Button variant="outline" size="sm" disabled>{">"}</Button>
                    <Button variant="outline" size="sm" disabled className="hidden sm:inline-flex">Last</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;