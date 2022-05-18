export type TCard = 'PAST' | 'NEXT' | 'MY';

type TFailures = {
  time: number;
  altitude: number;
  reason: string;
};

type TFairings = {
  reused?: boolean;
  recovery_attempt?: boolean;
  recovered?: boolean;
  ships: string;
};

type TCrew = {
  crew?: string;
  role?: string;
};

type TCore = {
  core?: string;
  flight?: number;
  gridfins?: boolean;
  legs?: boolean;
  reused?: boolean;
  landing_attempt?: boolean;
  landing_success?: boolean;
  landing_type?: string;
  landpad?: string;
};

type TPatch = {
  small?: string;
  large?: string;
};

type TReddit = {
  campaning?: string;
  launch?: string;
  media?: string;
  recovery?: string;
};

type TFlickr = {
  small?: string[];
  original?: string[];
};

type TLink = {
  patch: TPatch;
  reddit: TReddit;
  flickr: TFlickr;
  presskit?: string;
  webcast?: string;
  youtube_id?: string;
  article?: string;
  wikipedia?: string;
};

export type TFlight = {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour';
  static_fire_date_utc: string;
  static_fire_date_unix?: number;
  tdb?: boolean;
  net?: boolean;
  window?: number;
  rocket?: string;
  success?: boolean;
  failures: TFailures[];
  upcoming: boolean;
  details?: string;
  fairings?: TFairings;
  crew: TCrew[];
  ships?: string[];
  capsules?: string[];
  payloads?: string[];
  launchpad?: string;
  cores: TCore[];
  links: TLink[];
  auto_update?: boolean;
};
