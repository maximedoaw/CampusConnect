'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Lock, Globe, Users, Hash, Image } from 'lucide-react';

interface CreateCommunityProps {
  onClose: () => void;
}

const communityTypes = [
  { id: 'public', name: 'Publique', icon: Globe, description: 'Visible par tous, tout le monde peut poster' },
  { id: 'restricted', name: 'Restreinte', icon: Users, description: 'Visible par tous, modération des posts' },
  { id: 'private', name: 'Privée', icon: Lock, description: 'Visible et accessible sur invitation seulement' },
];

const categories = [
  { id: 'academic', name: 'Académique' },
  { id: 'social', name: 'Social' },
  { id: 'sports', name: 'Sports' },
  { id: 'arts', name: 'Arts & Culture' },
  { id: 'tech', name: 'Technologie' },
  { id: 'other', name: 'Autre' },
];

export function CreateCommunity({ onClose }: CreateCommunityProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [communityType, setCommunityType] = useState('public');
  const [category, setCategory] = useState('');
  const [rules, setRules] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Communauté créée:', {
      name,
      description,
      type: communityType,
      category,
      rules: rules.filter(r => r.trim() !== ''),
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const addRule = () => {
    setRules([...rules, '']);
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
      setRules(rules.filter((_, i) => i !== index));
    }
  };

  const selectedType = communityTypes.find(type => type.id === communityType);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span>Créer une communauté</span>
            </div>
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
          {/* Nom de la communauté */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nom de la communauté <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <div className="flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-gray-500">
                r/
              </div>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="informatique, musique, sports..."
                required
                maxLength={21}
                className="rounded-l-none"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Les noms ne peuvent pas être changés
              </span>
              <span className={`font-medium ${name.length >= 21 ? 'text-red-500' : 'text-gray-500'}`}>
                {name.length}/21
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le but de votre communauté..."
              required
              rows={3}
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500">
              {description.length}/500
            </div>
          </div>

          {/* Type de communauté */}
          <div className="space-y-3">
            <Label>Type de communauté</Label>
            <div className="grid gap-3 sm:grid-cols-3">
              {communityTypes.map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={communityType === type.id ? 'default' : 'outline'}
                  className={`h-auto flex-col items-start p-4 text-left ${communityType === type.id ? 'bg-blue-600 hover:bg-blue-700 border-blue-600' : 'hover:border-blue-300'}`}
                  onClick={() => setCommunityType(type.id)}
                >
                  <type.icon className="mb-2 h-5 w-5" />
                  <div className="font-medium">{type.name}</div>
                  <div className="mt-1 text-xs opacity-80">{type.description}</div>
                </Button>
              ))}
            </div>
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Règles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Règles de la communauté</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRule}
              >
                Ajouter une règle
              </Button>
            </div>
            <div className="space-y-2">
              {rules.map((rule, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                    <span className="font-semibold text-gray-600">{index + 1}</span>
                  </div>
                  <Input
                    value={rule}
                    onChange={(e) => updateRule(index, e.target.value)}
                    placeholder={`Règle ${index + 1} (optionnel)`}
                  />
                  {rules.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRule(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image de communauté (optionnel) */}
          <div className="space-y-2">
            <Label htmlFor="image">Image de communauté</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-300">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  Ajoutez une image pour personnaliser votre communauté
                </p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Télécharger une image
                </Button>
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
            <h4 className="mb-2 font-semibold text-gray-900">Récapitulatif</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700">r/{name || 'nomcommunauté'}</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedType?.icon && <selectedType.icon className="h-4 w-4 text-blue-600" />}
                <span className="text-gray-700">Communauté {selectedType?.name.toLowerCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700">0 membres (vous êtes le premier!)</span>
              </div>
            </div>
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
              disabled={!name.trim() || !description.trim() || isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Création...
                </>
              ) : (
                'Créer la communauté'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}