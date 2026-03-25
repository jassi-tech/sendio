'use client';
import { useState } from 'react';
import { ScrollText, Loader2, ChevronLeft, ChevronRight, X, RefreshCw, Mail, User, Clock, AlertCircle, Terminal, Key, ArrowRight } from 'lucide-react';
import { useLogs } from '@/hooks/useLogs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table';
import type { Status, LogItem } from '@/lib/interface';


const getStatusVariant = (s: Status): 'success' | 'error' | 'warning' | 'info' => {
  const map: Record<Status, 'success' | 'error' | 'warning' | 'info'> = {
    sent: 'success',
    failed: 'error',
    queued: 'warning',
    sending: 'info',
  };
  return map[s] || 'warning';
};

export default function LogsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<LogItem | null>(null);
  const limit = 15;

  const { data, isLoading, isFetching, refetch } = useLogs({ 
    page, 
    limit, 
    status: statusFilter || undefined 
  });

  const logs = data?.data || [];
  const total = data?.pagination?.total || 0;
  const loading = isLoading || isFetching;

  const pages = Math.ceil(total / limit);

  return (
    <div className="animate-fade-in space-y-s-32">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-s-16">
        <div>
          <h1 className="text-s-32 font-black text-text-primary tracking-tight mb-s-4">Email Logs</h1>
          <p className="text-text-secondary text-s-15">{total.toLocaleString()} total delivery attempts tracked.</p>
        </div>
        <div className="flex items-center gap-s-12">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-bg-elevated border border-border rounded-s-10 text-text-primary text-s-14 outline-none p-s-10 px-s-16 appearance-none transition-all focus:border-accent min-w-s-160"
          >
            <option value="">All Statuses</option>
            <option value="sent">Sent Successfully</option>
            <option value="failed">Delivery Failed</option>
            <option value="queued">Queued</option>
            <option value="sending">In Flight</option>
          </select>
          <Button variant="secondary" onClick={() => refetch()} icon={<RefreshCw size={14} />}>Refresh</Button>
        </div>
      </div>

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <div className="p-s-80 flex flex-col items-center justify-center text-text-muted gap-s-16">
            <Loader2 className="w-s-32 h-s-32 animate-spin text-accent" />
            <span className="text-s-14 font-medium">Crunching logs...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-s-80 flex flex-col items-center justify-center text-center space-y-s-16">
            <div className="w-s-64 h-s-64 rounded-full bg-bg-elevated flex items-center justify-center border border-border text-text-muted">
              <ScrollText size={32} />
            </div>
            <div>
              <h3 className="text-s-18 font-bold text-text-primary">No Activity Recorded</h3>
              <p className="text-text-secondary text-s-14 max-w-s-300 mx-auto">
                Logs will appear here once you start sending emails through the MailFlow API.
              </p>
            </div>
          </div>
        ) : (
          <>
            <Table>
              <THead className="hidden lg:table-header-group">
                <TR>
                  <TH>Recipient & Subject</TH>
                  <TH>Status</TH>
                  <TH>Sender Profile</TH>
                  <TH>Date & Time</TH>
                  <TH className="text-right sr-only">Details</TH>
                </TR>
              </THead>
              <TBody>
                {logs.map((log: LogItem) => (
                  <TR key={log._id} onClick={() => setSelected(log)}>
                    <TD>
                      <div className="flex items-center gap-s-12">
                         <div className={`w-s-40 h-s-40 rounded-s-10 flex items-center justify-center shrink-0 ${log.status === 'failed' ? 'bg-error/10 text-error' : 'bg-bg-elevated text-text-muted'}`}>
                            <Mail size={18} />
                         </div>
                         <div className="min-w-0">
                           <div className="font-bold text-text-primary truncate text-s-14">
                             {Array.isArray(log.to) ? log.to[0] : log.to}
                             {Array.isArray(log.to) && log.to.length > 1 && (
                               <span className="text-text-muted text-s-12 ml-s-4">+{log.to.length - 1} more</span>
                             )}
                           </div>
                           <div className="text-s-12 text-text-muted truncate">{log.subject}</div>
                         </div>
                      </div>
                    </TD>
                    <TD>
                       <Badge variant={getStatusVariant(log.status)}>
                         {log.status}
                       </Badge>
                    </TD>
                    <TD className="hidden lg:table-cell">
                       <div className="flex items-center gap-s-8 text-s-13">
                          <User size={14} className="text-text-muted" />
                          <span className="font-medium text-text-secondary truncate max-w-s-120">
                             {log.smtpConfigId?.label || 'Internal System'}
                          </span>
                       </div>
                    </TD>
                    <TD className="hidden lg:table-cell">
                       <div className="flex items-center gap-s-8 text-s-12 text-text-muted">
                          <Clock size={14} />
                          {new Date(log.createdAt).toLocaleString()}
                       </div>
                    </TD>
                    <TD className="text-right">
                       <ArrowRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>

            {/* Pagination Container */}
            {pages > 1 && (
              <div className="p-s-16 border-t border-border flex items-center justify-between bg-bg-card/30">
                <div className="text-s-13 text-text-secondary hidden sm:block">
                  Showing <span className="font-bold text-text-primary">{(page - 1) * limit + 1}</span> to <span className="font-bold text-text-primary">{Math.min(page * limit, total)}</span> of <span className="font-bold text-text-primary">{total}</span>
                </div>
                <div className="flex items-center gap-s-8 w-full sm:w-auto">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    disabled={page === 1} 
                    onClick={() => setPage(page - 1)}
                    icon={<ChevronLeft size={16} />}
                  >
                    Prev
                  </Button>
                  <div className="px-s-12 text-s-14 font-bold text-text-primary">
                    {page} <span className="text-text-muted font-normal mx-s-4">/</span> {pages}
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    disabled={page === pages} 
                    onClick={() => setPage(page + 1)}
                  >
                    Next <ChevronRight size={16} className="ml-s-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Detail Slider Overlay */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity animate-fade-in" onClick={() => setSelected(null)} />
          <aside className="fixed top-0 right-0 bottom-0 w-full max-w-s-500 bg-bg-card z-[101] shadow-2xl border-l border-border animate-slide-left flex flex-col">
             <div className="p-s-24 border-b border-border flex items-center justify-between bg-bg-card sticky top-0">
                <div className="flex items-center gap-s-12">
                   <div className="w-s-40 h-s-40 rounded-s-10 bg-accent/10 flex items-center justify-center text-accent">
                      <Terminal size={20} />
                   </div>
                   <h3 className="text-s-18 font-bold text-text-primary">Log Details</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelected(null)} icon={<X size={20} />} />
             </div>

             <div className="flex-1 p-s-32 overflow-y-auto space-y-s-32">
                {[
                  { label: 'Status', value: <Badge variant={getStatusVariant(selected.status)} className="text-s-12 py-s-4 px-s-12">{selected.status.toUpperCase()}</Badge> },
                  { label: 'To', value: Array.isArray(selected.to) ? selected.to.join(', ') : selected.to, icon: Mail },
                  { label: 'Subject', value: selected.subject, icon: ScrollText },
                  { label: 'Sender Profile', value: selected.smtpConfigId ? `${selected.smtpConfigId.label} (${selected.smtpConfigId.fromEmail})` : 'System managed', icon: User },
                  { label: 'API Key used', value: selected.apiKeyId ? `${selected.apiKeyId.label} (Prefix: ${selected.apiKeyId.keyPrefix})` : 'Session auth', icon: Key },
                  { label: 'Event Date', value: new Date(selected.createdAt).toLocaleString(), icon: Clock },
                  { label: 'Delivery Time', value: selected.sentAt ? new Date(selected.sentAt).toLocaleString() : 'Pending/Failed', icon: Clock },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-s-8">
                    <div className="flex items-center gap-s-8 text-s-11 font-black text-text-muted uppercase tracking-widest">
                       {item.icon && <item.icon size={11} />}
                       {item.label}
                    </div>
                    <div className="text-s-15 text-text-primary font-medium leading-relaxed bg-bg-elevated/40 p-s-16 rounded-s-10 border border-border/50">
                       {item.value}
                    </div>
                  </div>
                ))}

                {selected.errorMessage && (
                  <div className="space-y-s-10">
                    <div className="flex items-center gap-s-8 text-s-11 font-black text-error uppercase tracking-widest">
                       <AlertCircle size={11} />
                       Error Trace
                    </div>
                    <div className="p-s-20 bg-error/5 border border-error/20 rounded-s-12 text-s-13 text-error font-mono leading-relaxed whitespace-pre-wrap break-all shadow-inner">
                       {selected.errorMessage}
                    </div>
                  </div>
                )}
             </div>

             <div className="p-s-24 border-t border-border bg-bg-card flex justify-end sticky bottom-0">
                <Button variant="secondary" onClick={() => setSelected(null)}>Close Insight</Button>
             </div>
          </aside>
        </>
      )}
    </div>
  );
}

