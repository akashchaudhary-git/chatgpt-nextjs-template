// app/page.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Image,
  Paperclip,
  Mic, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  MoreVertical,
  Plus,
  MessageSquare,
  Settings,
  User,
  Bot,
  Download,
  Share,
  Trash2,
  ChevronDown,
  Sparkles,
  Moon,
  Sun,
  Monitor,
  X,
  Menu,
  Edit3,
  Check,
  RotateCcw,
  Zap,
  Brain,
  Code,
  FileText,
  HelpCircle,
  Star
} from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/stackoverflow-light.css';
import 'highlight.js/styles/atom-one-light.css';

// Dark themes  
import 'highlight.js/styles/github-dark.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/vs2015.css';


export default function ChatApp() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
      rating: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('GPT-4.1');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Welcome Chat', lastMessage: 'Hello! I\'m your AI assistant...', timestamp: new Date() }
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [showTableOptions, setShowTableOptions] = useState(false);
  const [tableCopied, setTableCopied] = useState(null);

  const models = [
    { id: 'gpt-4.1', name: 'GPT-4.1', description: 'Most capable model', icon: '🧠' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and efficient', icon: '⚡' },
    { id: 'claude-3', name: 'Claude-3', description: 'Thoughtful responses', icon: '🎭' },
    { id: 'gemini', name: 'Gemini Pro', description: 'Google\'s latest', icon: '💎' }
  ];

  const quickPrompts = [
    { icon: '💡', text: 'Explain a complex topic', prompt: 'Explain quantum computing in simple terms' },
    { icon: '✍️', text: 'Help me write', prompt: 'Help me write a professional email' },
    { icon: '🔍', text: 'Analyze data', prompt: 'Help me analyze this data and find insights' },
    { icon: '🎨', text: 'Creative ideas', prompt: 'Give me creative ideas for a project' },
    { icon: '🐛', text: 'Debug code', prompt: 'Help me debug this code' },
    { icon: '📚', text: 'Learn something', prompt: 'Teach me about machine learning basics' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [copiedCode, setCopiedCode] = useState(null);
 useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  useEffect(() => {
  // Dynamically load highlight.js theme based on current theme
  const loadHighlightTheme = async () => {
    if (theme === 'dark') {
      await import('highlight.js/styles/github-dark.css');
    } else {
      await import('highlight.js/styles/github.css');
    }
  };
  
  loadHighlightTheme();
}, [theme]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (showTableOptions && !event.target.closest('.relative')) {
      setShowTableOptions(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showTableOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && attachedFiles.length === 0) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      attachments: [...attachedFiles],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFiles([]);
    setIsTyping(true);

    // Update chat history
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, title: chat.title === 'New Chat' ? input.slice(0, 30) + '...' : chat.title, lastMessage: input.slice(0, 50) + '...', timestamp: new Date() }
          : chat
      )
    );

    // Simulate AI response with more realistic delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateMockResponse(input),
        timestamp: new Date(),
        rating: null
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, Math.random() * 2000 + 1000); // 1-3 seconds
  };


    const generateMockResponse = (userInput) => {
  const responses = [
    `I understand you're asking about "${userInput.slice(0, 20)}...". Here's a comprehensive response:

## Key Concepts

- **First point**: Understanding the fundamentals
- **Second point**: Practical applications  
- **Third point**: Common challenges and solutions

### Code Example
\`\`\`javascript
function example() {
  console.log("This is a code snippet");
  return "formatted nicely";
}
\`\`\`

> This approach ensures you get actionable insights that you can implement right away.`,

    `That's an excellent question! Let me break this down:

| Feature | Description | Benefit |
|---------|-------------|---------|
| Analysis | Deep dive into concepts | Better understanding |
| Examples | Practical demonstrations | Real-world application |
| Solutions | Step-by-step guidance | Easy implementation |

### Next Steps:
1. Review the fundamentals
2. Practice with examples
3. Apply to your specific use case

Would you like me to elaborate on any specific aspect?`,

    `Great question about **${userInput.slice(0, 20)}...**! Here's my analysis:

### Immediate Actions ✅
- Start with the basics
- Build incrementally  
- Test and iterate

### Long-term Strategy 📈
\`\`\`python
# Example implementation
def solve_problem():
    steps = ["analyze", "plan", "execute", "review"]
    return [step.upper() for step in steps]
\`\`\`

> **Pro tip**: Focus on one step at a time for better results.

What specific aspect would you like to explore further?`,

    `I'd be happy to help with "${userInput.slice(0, 20)}...". 

## Overview
This is a multifaceted topic that requires careful consideration.

### Recommendations:

#### 🚀 Getting Started
- **Foundation**: Build solid understanding of core concepts
- **Practice**: Apply knowledge through hands-on exercises
- **Iteration**: Continuously improve and refine your approach

#### 📊 Data Analysis
\`\`\`sql
SELECT category, COUNT(*) as total
FROM examples 
WHERE status = 'active'
GROUP BY category
ORDER BY total DESC;
\`\`\`

#### 🔧 Implementation Steps

| Step | Action | Timeline |
|------|--------|----------|
| 1 | Research and planning | Week 1 |
| 2 | Initial implementation | Week 2-3 |
| 3 | Testing and refinement | Week 4 |
| 4 | Documentation | Week 5 |

> **Note**: Adjust timeline based on project complexity and available resources.

### Common Pitfalls to Avoid:
- Rushing through the planning phase
- Ignoring edge cases
- Skipping proper testing

Would you like me to dive deeper into any of these areas?`
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

const copyToClipboard = async (text, id = null) => {
  try {
    await navigator.clipboard.writeText(text);
    if (id) {
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 seconds
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

  const rateMessage = (messageId, rating) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating: msg.rating === rating ? null : rating } : msg
      )
    );
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
    };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files.forEach(file => {
      const fileData = {
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: null
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachedFiles(prev => 
            prev.map(f => 
              f.id === fileData.id 
                ? { ...f, preview: e.target.result }
                : f
            )
          );
        };
        reader.readAsDataURL(file);
      }

      setAttachedFiles(prev => [...prev, fileData]);
    });
  };

  const removeAttachment = (fileId) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📽️';
    if (fileType.includes('text')) return '📄';
    if (fileType.includes('zip') || fileType.includes('rar')) return '🗜️';
    return '📎';
  };

  // Handle paste events for screenshots
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            const timestamp = new Date().toLocaleString().replace(/[/:]/g, '-');
            const renamedFile = new File([file], `Screenshot-${timestamp}.png`, {
              type: file.type,
            });
            handleFiles([renamedFile]);
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement speech recognition logic here
  };

  const newChat = () => {
    const newChatId = Date.now();
    const newChatItem = {
      id: newChatId,
      title: 'New Chat',
      lastMessage: '',
      timestamp: new Date()
    };
    setChatHistory(prev => [newChatItem, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([{
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
      rating: null
    }]);
  };

  const deleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId && chatHistory.length > 1) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
      setCurrentChatId(remainingChats[0].id);
    }
  };

  const startEditingTitle = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const saveTitle = (chatId) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId ? { ...chat, title: editingTitle || 'Untitled Chat' } : chat
      )
    );
    setEditingChatId(null);
    setEditingTitle('');
  };

  const cancelEditing = () => {
    setEditingChatId(null);
    setEditingTitle('');
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const regenerateResponse = (messageIndex) => {
    const userMessage = messages[messageIndex - 1];
    if (userMessage && userMessage.type === 'user') {
      setIsTyping(true);
      
      setTimeout(() => {
        const newResponse = {
          id: Date.now(),
          type: 'assistant',
          content: generateMockResponse(userMessage.content),
          timestamp: new Date(),
          rating: null
        };
        
        setMessages(prev => [
          ...prev.slice(0, messageIndex),
          newResponse,
          ...prev.slice(messageIndex + 1)
        ]);
        setIsTyping(false);
      }, Math.random() * 2000 + 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={newChat}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 rounded-xl transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700/50 hover:shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Chat
              <Sparkles className="w-3 h-3 ml-auto text-blue-500" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
              <MessageSquare className="w-3 h-3" />
              Recent Chats
            </h3>
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative rounded-xl transition-all duration-200 ${
                    currentChatId === chat.id 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-700/50 shadow-sm' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-600/50'
                  }`}
                >
                  <div
                    onClick={() => setCurrentChatId(chat.id)}
                    className="flex items-center gap-3 p-3 cursor-pointer"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      currentChatId === chat.id ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                    <div className="flex-1 min-w-0">
                      {editingChatId === chat.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="flex-1 text-sm font-medium bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveTitle(chat.id);
                              if (e.key === 'Escape') cancelEditing();
                            }}
                            autoFocus
                          />
                          <button
                            onClick={() => saveTitle(chat.id)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1 text-gray-400 hover:bg-gray-100 rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {chat.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {chat.lastMessage}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {chat.timestamp.toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                    </div>
                  
                  {/* Chat Actions */}
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingTitle(chat.id, chat.title);
                        }}
                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="Edit title"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer relative transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Akash Chaudhary</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  Pro Plan
                </p>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
              
              {/* Enhanced Settings Dropdown */}
              {showSettings && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl py-2 z-50 backdrop-blur-xl">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-200 dark:border-gray-600">
                    Appearance
                  </div>
                  
                  <button
                    onClick={() => {
                      if (theme !== 'light') toggleTheme();
                      setShowSettings(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      theme === 'light' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Light Mode
                    {theme === 'light' && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </button>
                  
                  <button
                    onClick={() => {
                      if (theme !== 'dark') toggleTheme();
                      setShowSettings(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      theme === 'dark' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Dark Mode
                    {theme === 'dark' && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </button>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Account
                    </div>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <User className="w-4 h-4" />
                      Profile Settings
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Export Chats
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Clear All Chats
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Top Bar */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              {/* Enhanced Model Selector */}
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="appearance-none bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.name}>
                      {model.icon} {model.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Model Info */}
              <div className="hidden md:block">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {models.find(m => m.name === selectedModel)?.description}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                <Share className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-500" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-green-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-indigo-100/40">
          {messages.length === 1 ? (
            /* Welcome Screen */
            <div className="h-full flex flex-col items-center justify-center p-4 overflow-y-auto">
                <div className="max-w-6xl w-full">
                    <div className="text-center mb-8">
                    {/* Reduce icon size */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    {/* Reduce heading size */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        What can I help you with?
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        I'm your AI assistant, ready to help with any questions or tasks
                    </p>
                    </div>

                {/* Quick Prompts */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
                {quickPrompts.map((prompt, index) => (
                    <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    className="group p-4 bg-indigo-100/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-indigo-100/80 dark:hover:bg-gray-800/80 hover:border-blue-200 dark:hover:border-blue-700/50 hover:shadow-lg transition-all duration-200 text-left"
                    >
                    <div className="text-xl mb-2">{prompt.icon}</div>
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {prompt.text}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {prompt.prompt}
                    </p>
                    </button>
                ))}
                </div>

                {/* Features */}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">Smart Responses</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Get intelligent, contextual answers</p>
                    </div>
                    <div className="p-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">File Support</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Upload images, documents, and more</p>
                    </div>
                    <div className="p-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">Code Help</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Debug, explain, and write code</p>
                    </div>
                    </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="p-4 space-y-8 max-w-4xl mx-auto">
              {messages.slice(1).map((message, index) => (
                <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'assistant' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-3xl ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user' 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto shadow-xl' 
                            : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-gray-100 shadow-xl'
                        }`}>
                      {/* Render attachments for user messages */}
                      {message.type === 'user' && message.attachments && message.attachments.length > 0 && (
                        <div className="mb-4 space-y-3">
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id} className="bg-black/10 rounded-xl p-4 backdrop-blur-sm">
                              {attachment.type.startsWith('image/') ? (
                                <div className="flex items-center gap-4">
                                  {attachment.preview && (
                                    <img 
                                      src={attachment.preview} 
                                      alt={attachment.name}
                                      className="w-16 h-16 object-cover rounded-lg border-2 border-white/20 shadow-sm"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                      {attachment.name}
                                    </p>
                                    <p className="text-xs text-white/70">
                                      {formatFileSize(attachment.size)}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                                    {getFileIcon(attachment.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                      {attachment.name}
                                    </p>
                                    <p className="text-xs text-white/70">
                                      {formatFileSize(attachment.size)}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {message.content && (
  <div className="prose prose-sm max-w-none dark:prose-invert">
    {message.type === 'assistant' ? (
        <div className="text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        
        components={{
          
        code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            
            // Function to extract plain text from React nodes
            const getTextContent = (node) => {
                if (typeof node === 'string') return node;
                if (typeof node === 'number') return node.toString();
                if (Array.isArray(node)) return node.map(getTextContent).join('');
                if (node && typeof node === 'object' && node.props && node.props.children) {
                return getTextContent(node.props.children);
                }
                return '';
            };
            
            const codeString = getTextContent(children);
            
            return !inline ? (
                <div className="relative group">
                <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm" {...props}>
                    <code className={className} {...props}>
                    {children}
                    </code>
                </pre>
                {match && (
                    <span className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded">
                    {match[1]}
                    </span>
                )}
                <button
                    onClick={() => copyToClipboard(codeString)}
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 bg-white dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                    title="Copy code"
                >
                    <Copy className="w-3 h-3" />
                </button>
                </div>
            ) : (
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
                </code>
            );
          },
        
        table: ({children, ...props}) => {
            const tableRef = useRef(null);
            //   const [showTableOptions, setShowTableOptions] = useState(false);
            //   const [tableCopied, setTableCopied] = useState(null);
            
            const copyTable = (format) => {
                if (!tableRef.current) return;
                
                const rows = tableRef.current.querySelectorAll('tr');
                let content = '';
                
                switch (format) {
                case 'markdown':
                    rows.forEach((row, rowIndex) => {
                    const cells = row.querySelectorAll('th, td');
                    const rowData = Array.from(cells).map(cell => cell.textContent.trim());
                    
                    if (rowIndex === 0) {
                        content += '| ' + rowData.join(' | ') + ' |\n';
                        content += '|' + rowData.map(() => '---').join('|') + '|\n';
                    } else {
                        content += '| ' + rowData.join(' | ') + ' |\n';
                    }
                    });
                    break;
                    
                case 'csv':
                    rows.forEach((row) => {
                    const cells = row.querySelectorAll('th, td');
                    const rowData = Array.from(cells).map(cell => {
                        const text = cell.textContent.trim();
                        return text.includes(',') || text.includes('"') || text.includes('\n') 
                        ? `"${text.replace(/"/g, '""')}"` 
                        : text;
                    });
                    content += rowData.join(',') + '\n';
                    });
                    break;
                    
                case 'text':
                    const allRows = Array.from(rows).map(row => {
                    const cells = row.querySelectorAll('th, td');
                    return Array.from(cells).map(cell => cell.textContent.trim());
                    });
                    
                    const colWidths = allRows[0].map((_, colIndex) => 
                    Math.max(...allRows.map(row => row[colIndex]?.length || 0), 8)
                    );
                    
                    allRows.forEach((rowData, rowIndex) => {
                    const formattedRow = rowData.map((cell, i) => 
                        cell.padEnd(colWidths[i])
                    ).join(' | ');
                    content += formattedRow + '\n';
                    
                    if (rowIndex === 0) {
                        content += colWidths.map(width => '-'.repeat(width)).join('-|-') + '\n';
                    }
                    });
                    break;
                }
                
                copyToClipboard(content.trim());
                setTableCopied(format);
                setShowTableOptions(false);
                setTimeout(() => setTableCopied(null), 2000);
            };
            
            return (
                <div className="overflow-x-auto my-4 relative group">
                <table 
                    ref={tableRef}
                    className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" 
                    {...props}
                >
                    {children}
                </table>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                    <button
                        onClick={() => setShowTableOptions(!showTableOptions)}
                        className="p-1.5 bg-white dark:bg-gray-700 rounded shadow-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-xs flex items-center gap-1"
                        title="Copy table"
                    >
                        {tableCopied ? (
                        <>
                            <Check className="w-3 h-3 text-green-500" />
                            <span className="hidden sm:inline text-green-500">Copied!</span>
                        </>
                        ) : (
                        <>
                            <Copy className="w-3 h-3" />
                            <ChevronDown className="w-3 h-3" />
                        </>
                        )}
                    </button>
                    
                    {showTableOptions && (
                        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                        <button
                            onClick={() => copyTable('markdown')}
                            className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                            <span>📝</span> Markdown
                        </button>
                        <button
                            onClick={() => copyTable('csv')}
                            className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                            <span>📊</span> CSV
                        </button>
                        <button
                            onClick={() => copyTable('text')}
                            className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                            <span>📄</span> Plain Text
                        </button>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            );
            },
          th: ({children, ...props}) => (
            <th className="border border-gray-300 dark:border-gray-600 bg-indigo-100 dark:bg-gray-700 px-3 py-2 text-left font-semibold" {...props}>
              {children}
            </th>
          ),
          td: ({children, ...props}) => (
            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2" {...props}>
              {children}
            </td>
          ),
          blockquote: ({children, ...props}) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic" {...props}>
              {children}
            </blockquote>
          ),
          h1: ({children, ...props}) => (
            <h1 className="text-xl font-bold mt-6 mb-4 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </h1>
          ),
          h2: ({children, ...props}) => (
            <h2 className="text-lg font-bold mt-5 mb-3 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </h2>
          ),
          h3: ({children, ...props}) => (
            <h3 className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </h3>
          ),
          ul: ({children, ...props}) => (
            <ul className="list-disc list-inside my-3 space-y-1" {...props}>
              {children}
            </ul>
          ),
          ol: ({children, ...props}) => (
            <ol className="list-decimal list-inside my-3 space-y-1" {...props}>
              {children}
            </ol>
          ),
          li: ({children, ...props}) => (
            <li className="text-sm leading-relaxed" {...props}>
              {children}
            </li>
          ),
          p: ({children, ...props}) => (
            <p className="text-sm leading-relaxed mb-3 last:mb-0" {...props}>
              {children}
            </p>
          ),
          a: ({children, href, ...props}) => (
            <a 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:underline" 
              target="_blank" 
              rel="noopener noreferrer" 
              {...props}
            >
              {children}
            </a>
          ),
          strong: ({children, ...props}) => (
            <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </strong>
          ),
          em: ({children, ...props}) => (
            <em className="italic" {...props}>
              {children}
            </em>
          )
        }}
      >
        {message.content}
      </ReactMarkdown>
      </div>
    ) : (
      <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">{message.content}</p>
    )}
  </div>
)}
                    </div>
                    
                    {/* Message Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-1 ml-auto">
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                            title="Copy message"
                          >
                            <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                          </button>
                          
                          <button
                            onClick={() => regenerateResponse(index + 1)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                            title="Regenerate response"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                          </button>
                          
                          <button
                            onClick={() => rateMessage(message.id, 'up')}
                            className={`p-2 rounded-lg transition-colors ${
                              message.rating === 'up' 
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-green-500'
                            }`}
                            title="Good response"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => rateMessage(message.id, 'down')}
                            className={`p-2 rounded-lg transition-colors ${
                              message.rating === 'down' 
                                ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500'
                            }`}
                            title="Poor response"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-4">
                  {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div> */}
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                    </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-6 py-4 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Enhanced Input Area */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {/* File Attachments Preview */}
            {attachedFiles.length > 0 && (
              <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex flex-wrap gap-3">
                  {attachedFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      {file.type.startsWith('image/') ? (
                        <div className="relative">
                          {file.preview ? (
                            <img 
                              src={file.preview} 
                              alt={file.name}
                              className="w-20 h-20 object-cover rounded-xl border-2 border-white dark:border-gray-600 shadow-sm"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center">
                              <Image className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeAttachment(file.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-xs p-2 rounded-b-xl truncate">
                            {file.name}
                          </div>
                        </div>
                      ) : (
                        <div className="relative bg-white dark:bg-gray-600 rounded-xl border-2 border-gray-200 dark:border-gray-500 p-4 w-52 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{getFileIcon(file.type)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(file.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-2">
                  <Paperclip className="w-3 h-3" />
                  {attachedFiles.length} file{attachedFiles.length !== 1 ? 's' : ''} attached
                </p>
              </div>
            )}
            
            {/* Input Field */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-lg">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={attachedFiles.length > 0 ? "Add a message (optional)..." : "Message ChatGPT..."}
                className="w-full px-6 py-4 bg-transparent resize-none focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 min-h-[60px] max-h-32 leading-relaxed"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              
              {/* Input Actions */}
              <div className="flex items-center justify-between p-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                    title="Attach files"
                  >
                    <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-500" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-2.5 rounded-xl transition-all group ${
                      isRecording 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 animate-pulse' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:text-green-500'
                    }`}
                    title={isRecording ? "Stop recording" : "Voice input"}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  
                  {/* Character count for long messages */}
                  {input.length > 100 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                      {input.length}/10000
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Model indicator */}
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {models.find(m => m.name === selectedModel)?.icon}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedModel}
                    </span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!input.trim() && attachedFiles.length === 0}
                    className={`p-2.5 rounded-xl transition-all shadow-lg ${
                      (!input.trim() && attachedFiles.length === 0)
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-xl transform hover:scale-105'
                    }`}
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Help Text */}
            <div className="flex items-center justify-center mt-3 text-xs text-gray-500 dark:text-gray-400 space-x-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Enter</kbd>
                to send
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Shift</kbd>
                +
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Enter</kbd>
                for new line
              </span>
              <span>• Paste images directly</span>
            </div>
          </form>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx,.zip,.rar"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
