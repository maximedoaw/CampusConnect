'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Image, Link2, FileText, Code, Bold, Italic, List } from 'lucide-react';

interface CreatePostProps {
  onClose: () => void;
}

const mockCommunities = [
  { id: '1', name: 'Informatique' },
  { id: '2', name: 'Génie Civil' },
  { id: '3', name: 'Promo 2024' },
  { id: '4', name: 'Club Musique' },
  { id: '5', name: 'Bibliothèque' },
];

const postTypes = [
  { id: 'text', name: 'Texte', icon: FileText },
  { id: 'link', name: 'Lien', icon: Link2 },
  { id: 'media', name: 'Média', icon: Image },
  { id: 'code', name: 'Code', icon: Code },
];

export function CreatePost({ onClose }: CreatePostProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [postType, setPostType] = useState('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Post créé:', {
      title,
      content,
      community: selectedCommunity,
      type: postType,
      imageUrl,
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const selectedType = postTypes.find(type => type.id === postType);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Créer une publication</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection de la communauté */}
          <div className="space-y-2">
            <Label htmlFor="community">Choisir une communauté *</Label>
            <Select value={selectedCommunity} onValueChange={setSelectedCommunity} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez une communauté" />
              </SelectTrigger>
              <SelectContent>
                {mockCommunities.map((community) => (
                  <SelectItem key={community.id} value={community.id}>
                    r/{community.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type de post */}
          <div className="space-y-2">
            <Label>Type de publication</Label>
            <div className="flex gap-2">
              {postTypes.map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={postType === type.id ? 'default' : 'outline'}
                  className={`flex-1 gap-2 ${postType === type.id ? 'bg-blue-600' : ''}`}
                  onClick={() => setPostType(type.id)}
                >
                  <type.icon className="h-4 w-4" />
                  {type.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Un titre accrocheur..."
              required
              maxLength={300}
              className="text-lg font-medium"
            />
            <div className="text-right text-xs text-gray-500">
              {title.length}/300 caractères
            </div>
          </div>

          {/* Contenu selon le type */}
          {postType === 'text' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Contenu</Label>
                <div className="flex gap-1">
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Partagez vos idées, questions ou réflexions..."
                rows={8}
                className="min-h-[200px] resize-y"
              />
              <div className="text-right text-xs text-gray-500">
                {content.length}/40000 caractères
              </div>
            </div>
          )}

          {postType === 'link' && (
            <div className="space-y-2">
              <Label htmlFor="link">URL du lien *</Label>
              <Input
                id="link"
                type="url"
                placeholder="https://exemple.com"
                required
                className="font-mono"
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Commentaire optionnel sur le lien..."
                rows={4}
                className="mt-2"
              />
            </div>
          )}

          {postType === 'media' && (
            <div className="space-y-2">
              <Label htmlFor="media">URL de l'image ou vidéo</Label>
              <Input
                id="media"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://exemple.com/image.jpg"
                className="font-mono"
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Description de votre média..."
                rows={4}
                className="mt-2"
              />
              {imageUrl && (
                <div className="mt-2 rounded-lg border p-2">
                  <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                  <img 
                    src={imageUrl} 
                    alt="Aperçu" 
                    className="max-h-48 rounded mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {postType === 'code' && (
            <div className="space-y-2">
              <Label htmlFor="code">Code *</Label>
              <Textarea
                id="code"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="// Collez votre code ici"
                rows={10}
                className="font-mono bg-gray-900 text-gray-100"
              />
              <div className="text-right text-xs text-gray-500">
                Langage : 
                <select className="ml-2 bg-transparent">
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>
          )}

          {/* Règles de la communauté */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-700">Rappel des règles</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                Respectez les autres membres
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                Pas de contenu inapproprié
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                Citez vos sources
              </li>
            </ul>
          </div>

          {/* Actions */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !selectedCommunity || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Publication...
                </>
              ) : (
                `Publier dans ${selectedCommunity ? 'r/' + mockCommunities.find(c => c.id === selectedCommunity)?.name : '...'}`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}