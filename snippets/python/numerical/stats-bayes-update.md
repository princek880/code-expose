---
lang: python
topic: numerical
tier: 2
tags: [statistics, bayes, conjugate]
note: Beta is conjugate to Bernoulli, so the update is just adding successes and failures.
---
def beta_update(alpha, beta, successes, failures):
    return alpha + successes, beta + failures

def beta_mean(alpha, beta):
    return alpha / (alpha + beta)

prior = (1.0, 1.0)
observations = [1, 1, 0, 1, 1, 1, 0, 1]
posterior = prior
for x in observations:
    posterior = beta_update(*posterior, x, 1 - x)
print(posterior, round(beta_mean(*posterior), 6))
print(round(beta_mean(*beta_update(*prior, sum(observations), len(observations) - sum(observations))), 6))
