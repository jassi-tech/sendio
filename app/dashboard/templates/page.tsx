'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, FileCode2, Loader2, X, Eye, EyeOff, Layout, Globe, Save, Code, Clock, Copy, Check, ArrowLeft } from 'lucide-react';
import { templatesApi } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import type { Template, FullTemplate } from '@/lib/interface';


export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FullTemplate | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', html: '' });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'code' | 'visual'>('code');

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'VISUAL_SYNC') {
        const newHtml = e.data.html;
        setForm(prev => {
          if (prev.html === newHtml) return prev;
          return { ...prev, html: newHtml };
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const injectVisualScript = (html: string) => {
    if (!html) return '';
    const script = `
<script>
  window.onload = () => {
    document.body.contentEditable = true;
    document.body.style.minHeight = '100vh';
    document.body.oninput = () => {
      window.parent.postMessage({ type: 'VISUAL_SYNC', html: document.body.innerHTML }, '*');
    };
    // Ensure links don't fire
    document.querySelectorAll('a').forEach(a => a.onclick = (e) => e.preventDefault());
  };
</script>`;
    return html + script;
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    templatesApi.list()
      .then((d) => {
        setTemplates(d as Template[] || []);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch templates:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => { 
    setEditing(null); 
    setForm({ name: '', subject: '', html: '' }); 
    setShowForm(true); 
  };

  const openEdit = async (t: Template) => {
    try {
      setLoading(true);
      const full = await templatesApi.get(t.templateId) as FullTemplate;
      setEditing(full); 
      setForm({ name: full.name, subject: full.subject, html: full.html }); 
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) {
        const updated = await templatesApi.update(editing.templateId as string, form) as FullTemplate;
        setTemplates((prev) => prev.map((t) => t.templateId === editing.templateId ? updated : t));
      } else {
        const created = await templatesApi.create(form) as FullTemplate;
        setTemplates((prev) => [created, ...prev]);
      }
      setShowForm(false);
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this template?')) return;
    await templatesApi.delete(id);
    setTemplates((prev) => prev.filter((t) => t.templateId !== id));
  };

  // Editor View Component
  if (showForm) {
    return (
      <div className="animate-fade-in space-y-s-24">
        <div className="flex items-center gap-s-16">
          <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} icon={<ArrowLeft size={18} />}>
            Back to Templates
          </Button>
          <div className="h-s-24 w-[1px] bg-border mx-s-8 hidden sm:block"></div>
          <div>
            <h1 className="text-s-24 font-black text-text-primary tracking-tight">
              {editing ? 'Refine Template' : 'Architect New Template'}
            </h1>
            <p className="text-s-13 text-text-muted font-medium">Crafting: {form.name || 'Untitled Template'}</p>
          </div>
        </div>

        <div className="bg-bg-card border border-border rounded-s-24 shadow-2xl flex flex-col overflow-hidden min-h-[800px]">
           <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left Pane - Editor */}
              <form id="template-form" onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden border-r border-border border-b lg:border-b-0 w-full lg:w-1/2">
                 <div className="p-s-24 space-y-s-24 border-b border-border bg-bg-elevated/20">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-s-24">
                     <Input 
                       label="Template Name" 
                       placeholder="e.g. Welcome Email" 
                       value={form.name} 
                       onChange={e => setForm({...form, name: e.target.value})} 
                       required 
                     />
                     <Input 
                       label="Email Subject" 
                       placeholder="Welcome to {{app_name}}!" 
                       value={form.subject} 
                       onChange={e => setForm({...form, subject: e.target.value})} 
                       required 
                     />
                   </div>
                 </div>

                 <div className="flex-1 flex flex-col bg-bg-base/50 p-s-24">
                   <div className="flex items-center justify-between mb-s-12">
                     <label className="text-s-13 font-bold text-text-secondary uppercase tracking-wider">HTML Canvas</label>
                     <Badge variant="neutral" className="font-mono text-[10px] bg-white/5 border-white/10 text-text-muted">Use {"{{variable}}"} for dynamic data</Badge>
                   </div>
                   <div className="flex-1 rounded-s-16 border border-white/10 bg-[#1e1e1e] p-[1px] focus-within:border-accent/50 transition-colors shadow-inner overflow-hidden flex flex-col min-h-[400px]">
                      <div className="flex items-center px-s-16 py-s-10 border-b border-white/10 bg-[#2d2d2d]">
                        <div className="flex gap-s-6">
                          <div className="w-s-10 h-s-10 rounded-full bg-red-500/80"></div>
                          <div className="w-s-10 h-s-10 rounded-full bg-amber-500/80"></div>
                          <div className="w-s-10 h-s-10 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="ml-s-12 text-[#858585] text-s-12 font-mono">template.html</span>
                      </div>
                      <textarea
                        value={form.html}
                        onChange={(e) => setForm({ ...form, html: e.target.value })}
                        placeholder="<!-- Craft your HTML here -->&#10;<h1>Hello {{name}},</h1>"
                        required
                        className="w-full flex-1 p-s-20 bg-transparent text-[#d4d4d4] text-s-14 outline-none font-mono leading-relaxed resize-none selection:bg-[#264f78]"
                        spellCheck={false}
                      />
                   </div>
                 </div>
              </form>

              {/* Right Pane - Preview */}
              <div className="flex-1 bg-white flex flex-col overflow-hidden w-full lg:w-1/2 relative min-h-[600px]">
                <div className="absolute top-0 inset-x-0 h-s-40 bg-gray-100 flex items-center justify-between px-s-16 border-b border-gray-200 shadow-sm z-10">
                  <span className="text-s-12 font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-s-6">
                    <Layout size={14} /> {editorMode === 'visual' ? 'Visual Editor' : 'Live Canvas Preview'}
                  </span>
                  <div className="flex bg-white border border-gray-300 rounded-s-8 p-s-2">
                    <button 
                      onClick={() => setEditorMode('code')}
                      className={`px-s-10 py-s-4 text-[10px] font-bold uppercase rounded-s-6 transition-all ${editorMode === 'code' ? 'bg-accent text-white' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => setEditorMode('visual')}
                      className={`px-s-10 py-s-4 text-[10px] font-bold uppercase rounded-s-6 transition-all ${editorMode === 'visual' ? 'bg-success text-white' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      Edit Visual
                    </button>
                  </div>
                </div>
                <div className="flex-1 mt-s-40 overflow-auto bg-gray-50 preview-bg-pattern">
                  <div className="min-h-full p-s-32 flex justify-center items-start">
                    <div className="w-full max-w-[600px] bg-white shadow-2xl rounded-sm border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">
                       {/* Email Client Mock Header */}
                       <div className="p-s-16 border-b border-gray-200 bg-gray-50/80 space-y-s-8 text-s-13 font-sans">
                         <div className="flex">
                           <span className="w-s-64 text-gray-400 font-medium text-right pr-s-12">From:</span>
                           <span className="text-gray-900 font-semibold">Your App &lt;noreply@yourapp.com&gt;</span>
                         </div>
                         <div className="flex">
                           <span className="w-s-64 text-gray-400 font-medium text-right pr-s-12">To:</span>
                           <span className="text-gray-900">customer@example.com</span>
                         </div>
                         <div className="flex">
                           <span className="w-s-64 text-gray-400 font-medium text-right pr-s-12">Subject:</span>
                           <span className="text-gray-900 font-bold">{form.subject || 'New Message'}</span>
                         </div>
                       </div>
                       <div className="flex-1 relative min-h-[400px]">
                         {form.html ? (
                           <iframe 
                             srcDoc={editorMode === 'visual' ? injectVisualScript(form.html) : form.html} 
                             className={`absolute inset-0 w-full h-full border-none bg-white font-sans ${editorMode === 'visual' ? 'ring-2 ring-success/20' : ''}`} 
                             title="preview" 
                           />
                         ) : (
                           <div className="absolute inset-0 flex items-center justify-center text-gray-300 flex-col gap-s-16">
                             <Globe size={64} className="opacity-10" />
                             <span className="text-s-14 font-medium uppercase tracking-widest text-center text-gray-400">Start coding<br/>to see preview</span>
                           </div>
                         )}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
           </div>

           <div className="p-s-24 border-t border-border flex flex-col sm:flex-row items-center justify-between bg-bg-elevated/50 z-20 gap-s-16">
              <div className="text-s-13 text-text-muted flex items-center gap-s-10 font-medium">
                 <div className="w-s-8 h-s-8 rounded-full bg-success animate-pulse"></div>
                 <span>Real-time rendering active</span>
              </div>
              <div className="flex gap-s-16 w-full sm:w-auto">
                <Button variant="ghost" onClick={() => setShowForm(false)} className="flex-1 sm:flex-none">Discard</Button>
                <Button type="submit" form="template-form" variant="primary" loading={saving} icon={<Save size={18} />} className="flex-1 sm:flex-none px-s-32">
                  {editing ? 'Update Template' : 'Save Template'}
                </Button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // List View (Default)
  return (
    <div className="animate-fade-in space-y-s-32">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-s-16">
        <div>
          <h1 className="text-s-32 font-black text-text-primary tracking-tight mb-s-4">Email Templates</h1>
          <p className="text-text-secondary text-s-15">Customizable HTML layouts for automated communication.</p>
        </div>
        <Button onClick={openNew} variant="primary" icon={<Plus size={18} />}>
          New Template
        </Button>
      </div>

      {loading ? (
        <div className="p-s-80 flex flex-col items-center justify-center text-text-muted gap-s-16">
          <Loader2 className="w-s-32 h-s-32 animate-spin text-accent" />
          <span className="text-s-14 font-medium tracking-wide">Gathering templates...</span>
        </div>
      ) : templates.length === 0 ? (
        <Card padded variant="elevated" className="flex flex-col items-center justify-center text-center p-s-80 space-y-s-24">
            <div className="w-s-80 h-s-80 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10 text-accent">
              <FileCode2 size={40} />
            </div>
            <div>
              <h3 className="text-s-20 font-bold text-text-primary">No Canvas Yet</h3>
              <p className="text-text-secondary text-s-15 max-w-s-400 mx-auto leading-relaxed">
                Email templates help you maintain consistent branding and dynamic content across all your communications.
              </p>
            </div>
            <Button onClick={openNew} variant="primary" size="md" className="px-s-32">Create First Template</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-s-24">
          {templates.map((t) => (
            <Card key={t.templateId} padded className="group transition-all hover:border-accent hover:-translate-y-s-4 flex flex-col relative overflow-hidden">
               {/* Accent line on hover */}
               <div className="absolute top-0 left-0 w-full h-s-2 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
               
               <div className="flex items-start justify-between mb-s-20">
                 <div className="w-s-48 h-s-48 bg-accent/10 rounded-s-16 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                   <Layout size={24} />
                 </div>
                 <div className="flex gap-s-8">
                   <Button variant="ghost" size="sm" onClick={() => openEdit(t)} icon={<Edit3 size={18} />} className="hover:bg-accent/10 hover:text-accent rounded-full w-s-36 h-s-36 p-0" />
                   {!t.isDefault && (
                     <Button variant="ghost" size="sm" onClick={() => handleDelete(t.templateId)} icon={<Trash2 size={18} />} className="hover:text-error hover:bg-error/5 rounded-full w-s-36 h-s-36 p-0" />
                   )}
                 </div>
               </div>
               <div className="flex-1">
                 <h3 className="text-s-18 font-bold text-text-primary mb-s-8 group-hover:text-accent transition-colors line-clamp-1">{t.name}</h3>
                 <p className="text-s-14 text-text-secondary mb-s-20 line-clamp-2 leading-relaxed">
                   <span className="text-text-muted italic mr-s-4">Subject:</span> {t.subject}
                 </p>
                 
                 {t.variables.length > 0 && (
                   <div className="flex gap-s-8 flex-wrap mb-s-20">
                     {t.variables.map((v) => (
                       <Badge key={v} variant="neutral" className="text-[10px] font-mono lowercase tracking-normal bg-bg-elevated/80 py-s-2 px-s-8 border-border/50">
                         {v}
                       </Badge>
                     ))}
                   </div>
                 )}
               </div>
               <div className="pt-s-20 border-t border-border mt-auto flex items-center justify-between">
                 <div 
                    className="group/id text-[11px] font-mono text-text-muted flex items-center gap-s-8 cursor-pointer hover:text-accent transition-colors bg-bg-elevated/50 px-s-10 py-s-6 rounded-s-8 border border-transparent hover:border-accent/20"
                    onClick={() => copyToClipboard(t.templateId)}
                    title="Click to copy Template ID"
                 >
                    {copiedId === t.templateId ? <Check size={12} className="text-success" /> : <Copy size={12} className="group-hover/id:scale-110 transition-transform" />}
                    <span className="opacity-80 font-medium">{t.templateId || 'Generating...'}</span>
                 </div>
                 <Badge variant={t.isDefault ? "info" : "neutral"} className="px-s-8 py-s-2 text-[10px] font-semibold uppercase tracking-wider">
                   {t.isDefault ? 'System' : 'Custom'}
                 </Badge>
               </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
