import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CATEGORIES } from '../../lib/constants';

const schema = z.object({
  title:       z.string().min(1, 'Event title is required'),
  date:        z.string().min(1, 'Date is required'),
  endDate:     z.string().optional().or(z.literal('')),
  startTime:   z.string().optional().or(z.literal('')),
  endTime:     z.string().optional().or(z.literal('')),
  location:    z.string().min(1, 'Location is required'),
  category:    z.enum(['meeting','fiesta','health','service','sports','cultural','holiday','others']),
  description: z.string().min(1, 'Description is required'),
  organizer:   z.string().optional().or(z.literal('')),
  contactInfo: z.string().optional().or(z.literal('')),
  isPublic:    z.boolean(),
  status:      z.enum(['draft','published','cancelled']),
});

const field =
  'w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy/30 outline-none font-medium';

const label = 'block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5';

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="text-[11px] text-red-500 mt-1 font-semibold">{msg}</p>;
}

export default function EventForm({ event, defaultDate, onSubmit, onCancel }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title:       event?.title       || '',
      date:        event?.date        || defaultDate || '',
      endDate:     event?.endDate     || '',
      startTime:   event?.startTime   || '',
      endTime:     event?.endTime     || '',
      location:    event?.location    || '',
      category:    event?.category    || 'others',
      description: event?.description || '',
      organizer:   event?.organizer   || '',
      contactInfo: event?.contactInfo || '',
      isPublic:    event?.isPublic    ?? true,
      status:      event?.status      || 'published',
    },
  });

  const onValid = (data) => {
    onSubmit({
      ...data,
      endDate:     data.endDate     || undefined,
      startTime:   data.startTime   || undefined,
      endTime:     data.endTime     || undefined,
      organizer:   data.organizer   || undefined,
      contactInfo: data.contactInfo || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-4" noValidate>
      <div>
        <label className={label}>Title <span className="text-red-400">*</span></label>
        <input {...register('title')} className={field} placeholder="Event name" />
        <FieldError msg={errors.title?.message} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Date <span className="text-red-400">*</span></label>
          <input type="date" {...register('date')} className={field} />
          <FieldError msg={errors.date?.message} />
        </div>
        <div>
          <label className={label}>End Date</label>
          <input type="date" {...register('endDate')} className={field} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Start Time</label>
          <input type="time" {...register('startTime')} className={field} />
        </div>
        <div>
          <label className={label}>End Time</label>
          <input type="time" {...register('endTime')} className={field} />
        </div>
      </div>

      <div>
        <label className={label}>Location <span className="text-red-400">*</span></label>
        <input {...register('location')} className={field} placeholder="Event venue" />
        <FieldError msg={errors.location?.message} />
      </div>

      <div>
        <label className={label}>Category <span className="text-red-400">*</span></label>
        <select {...register('category')} className={field + ' bg-white'}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <option key={key} value={key}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label}>Description <span className="text-red-400">*</span></label>
        <textarea
          {...register('description')}
          rows={3}
          className={field + ' resize-none'}
          placeholder="Event details..."
        />
        <FieldError msg={errors.description?.message} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Organizer</label>
          <input {...register('organizer')} className={field} placeholder="e.g. Mayor's Office" />
        </div>
        <div>
          <label className={label}>Contact Info</label>
          <input {...register('contactInfo')} className={field} placeholder="Tel. / Email" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Status</label>
          <select {...register('status')} className={field + ' bg-white'}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className={label}>Visibility</label>
          <label className="flex items-center gap-3 h-[42px] px-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors">
            <input
              type="checkbox"
              {...register('isPublic')}
              className="w-4 h-4 rounded border-stone-300 accent-navy"
            />
            <div>
              <p className="text-sm font-semibold text-navy leading-none">Public Event</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Visible to everyone · Uncheck = Internal only</p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-2 border-t border-stone-100">
        <button
          type="button"
          onClick={onCancel}
          className="bg-stone-100 text-slate-600 rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-stone-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-navy text-white rounded-lg px-5 py-2.5 text-sm font-bold hover:bg-navy/90 disabled:opacity-60"
        >
          {event ? 'Save Changes' : 'Add Event'}
        </button>
      </div>
    </form>
  );
}
