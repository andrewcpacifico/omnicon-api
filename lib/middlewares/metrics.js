const { Router } = require('express');
const Prometheus = require('prom-client');

const defaultOptions = {
  metricsPath: '/internal/metrics',
  collectDefaultMetrics: true,
};

const {
  PROMETHEUS_USER,
  PROMETHEUS_PASSWORD,
} = process.env;

const hash = Buffer.from(`${PROMETHEUS_USER}:${PROMETHEUS_PASSWORD}`)
  .toString('base64');
const auth = `Basic ${hash}`;

module.exports = (userOptions = {}) => {
  const router = new Router({ mergeParams: true });
  const options = { ...defaultOptions, ...userOptions };

  const { metricsPath, prefix } = options;

  if (options.collectDefaultMetrics) {
    // when this file is required, we will start to collect default metrics
    // automatically, including common cpu and heap usage metrics that can be
    // used to calculate saturation of the service
    Prometheus.collectDefaultMetrics({ prefix });
  }

  /**
   * Metrics route to be used by prometheus to scrape metrics
   */
  router.get(metricsPath, (req, res, next) => {
    if (req.header('Authorization') !== auth) {
      // dont hint the existence of this route by returning the default 404 page
      return next();
    }
    res.set('Content-Type', Prometheus.register.contentType);
    return res.end(Prometheus.register.metrics());
  });

  return router;
};
