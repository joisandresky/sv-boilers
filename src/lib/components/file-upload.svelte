<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { SvelteComponent } from 'svelte';
	import type { IconProps } from '@lucide/svelte';
	import FileIcon from '@lucide/svelte/icons/file';
	import Image from '@lucide/svelte/icons/image';
	import FileText from '@lucide/svelte/icons/file-text';
	import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
	import FileVideo from '@lucide/svelte/icons/file-video';
	import FileAudio from '@lucide/svelte/icons/file-audio';
	import FilePdf from '@lucide/svelte/icons/file';
	import FileCode from '@lucide/svelte/icons/file-code';
	import FileZip from '@lucide/svelte/icons/file-archive';
	import X from '@lucide/svelte/icons/x';
	import Upload from '@lucide/svelte/icons/upload-cloud';
	import AlertCircle from '@lucide/svelte/icons/alert-circle';

	import { cn } from '$lib/utils';

	interface $$Props {
		accept?: string;
		multiple?: boolean;
		maxSize?: number;
		class?: string;
		files?: File[];
	}

	let { 
		accept = '',
		multiple = false,
		maxSize = 5, // in MB
		class: className = '',
        files = $bindable([]) as File[]
    } = $props();

	let dragOver = $state(false);
	let fileInput: HTMLInputElement;

	type IconComponent = typeof SvelteComponent;

	const fileTypeIcons = {
		'image': Image,
		'text': FileText,
		'pdf': FilePdf,
		'spreadsheet': FileSpreadsheet,
		'video': FileVideo,
		'audio': FileAudio,
		'code': FileCode,
		'zip': FileZip,
		'default': FileIcon
	};

	function getFileIcon(type: string) {
		const [mainType, subType] = type.split('/');
		if (mainType === 'image') return fileTypeIcons.image;
		if (mainType === 'text' || subType === 'json') return fileTypeIcons.text;
		if (subType === 'pdf') return fileTypeIcons.pdf;
		if (subType.includes('spreadsheet') || subType === 'csv') return fileTypeIcons.spreadsheet;
		if (mainType === 'video') return fileTypeIcons.video;
		if (mainType === 'audio') return fileTypeIcons.audio;
		if (subType.includes('javascript') || subType.includes('typescript') || subType.includes('html')) return fileTypeIcons.code;
		if (subType.includes('zip') || subType.includes('compressed')) return fileTypeIcons.zip;
		return fileTypeIcons.default;
	}

	function getFilePreview(file: File): string | null {
		if (file.type.startsWith('image/')) {
			return URL.createObjectURL(file);
		}
		return null;
	}

	interface FileError {
		name: string;
		message: string;
	}

	let errors = $state<FileError[]>([]);

	function handleFiles(newFiles: FileList | null) {
		if (!newFiles) return;
		errors = [];

		const validFiles: File[] = [];
		const newErrors: FileError[] = [];

		Array.from(newFiles).forEach(file => {
			// Check file size
			if (file.size > maxSize * 1024 * 1024) {
				newErrors.push({
					name: file.name,
					message: `File size exceeds ${maxSize}MB limit`
				});
				return;
			}

			// Check file type if accept is specified
			if (accept) {
				const isValidType = accept.split(',').some((acceptType: string) => {
					acceptType = acceptType.trim();
					if (acceptType.startsWith('.')) {
						return file.name.toLowerCase().endsWith(acceptType.toLowerCase());
					} else {
						return file.type.match(new RegExp(acceptType.replace('*', '.*')));
					}
				});

				if (!isValidType) {
					newErrors.push({
						name: file.name,
						message: `File type not accepted. Allowed types: ${accept}`
					});
					return;
				}
			}

			validFiles.push(file);
		});

		if (newErrors.length > 0) {
			errors = newErrors;
		}

		if (validFiles.length > 0) {
			if (multiple) {
				files = [...files, ...validFiles];
			} else {
				files = validFiles.slice(0, 1);
			}
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		const droppedFiles = e.dataTransfer?.files;
		if (droppedFiles) {
			handleFiles(droppedFiles);
		}
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		dragOver = true;
	}

	function handleDragLeave() {
		dragOver = false;
	}

	function removeFile(file: File) {
		files = files.filter(f => f !== file);
	}

	function getFileExtension(filename: string): string {
		return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toUpperCase();
	}

	$effect(() => {
		// Cleanup object URLs when files change
		return () => {
			files.forEach(file => {
				if (file.type.startsWith('image/')) {
					const preview = getFilePreview(file);
					if (preview) {
						URL.revokeObjectURL(preview);
					}
				}
			});
		};
	});

</script>

<div
	class={cn(
		'relative flex flex-col gap-2',
		className
	)}
>
	{#if errors.length > 0}
		<div class="rounded-lg border border-destructive bg-destructive/10 p-3 text-destructive">
			<div class="flex items-center gap-2">
				<AlertCircle class="size-4" />
				<h4 class="font-medium">Upload failed</h4>
			</div>
			<ul class="mt-2 list-inside list-disc text-sm">
				{#each errors as error}
					<li>{error.name}: {error.message}</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div
		class={cn(
			'border-2 border-dashed transition-colors rounded-lg',
			dragOver ? 'border-primary bg-muted/50' : 'border-muted-foreground/20',
			files.length > 0 ? 'p-2' : 'p-8'
		)}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
		role="presentation"
        aria-label="Upload file"
	>
		{#if files.length === 0}
			<div
				class="flex flex-col items-center justify-center gap-2 text-center"
				onclick={() => fileInput.click()}
				onkeydown={(e) => e.key === 'Enter' && fileInput.click()}
				role="button"
				tabindex="0"
			>
				<Upload class="size-8 text-muted-foreground" />
				<div class="text-sm">
					<span class="font-medium text-primary">Click to upload</span>
					{' '}or drag and drop
				</div>
				<p class="text-xs text-muted-foreground">
					{#if accept}
						Allowed types: {accept}
					{/if}
					{#if maxSize}
						{accept ? ' • ' : ''}Maximum size: {maxSize}MB
					{/if}
				</p>
			</div>
		{:else}
			<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{#each files as file (file.name)}
					<div
						transition:fade
						class="group relative flex items-start gap-2 rounded-lg border p-2"
					>
						{#if file.type.startsWith('image/')}
							<div class="relative aspect-square h-14 overflow-hidden rounded">
								<img
									src={getFilePreview(file)}
									alt={file.name}
									class="h-full w-full object-cover"
								/>
							</div>
						{:else}
							{@const Icon = getFileIcon(file.type)}
							<div class="flex aspect-square h-14 items-center justify-center rounded bg-muted">
								<Icon class="size-6" />
							</div>
						{/if}
						<div class="flex-1 truncate">
							<p class="truncate text-sm font-medium">{file.name}</p>
							<p class="text-xs text-muted-foreground">
								{(file.size / 1024 / 1024).toFixed(2)}MB
								{#if !file.type.startsWith('image/')}
									• .{getFileExtension(file.name)}
								{/if}
							</p>
						</div>
						<button
							type="button"
							class="absolute right-2 top-2 rounded-full bg-destructive p-1 opacity-0 transition-opacity group-hover:opacity-100"
							onclick={() => removeFile(file)}
						>
							<X class="size-3 text-destructive-foreground" />
							<span class="sr-only">Remove file</span>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<input
		bind:this={fileInput}
		type="file"
		{accept}
		{multiple}
		class="hidden"
		name="avatar"
		onchange={(e) => handleFiles(e.currentTarget.files)}
	/>
</div> 