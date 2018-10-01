var datafile = "/static/data/incise_data_export.csv"

// Overall barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        "Overall": +d.composite,
        "OverallGDP": +d.overall_gdp,

    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#overall_bar", csv_data, 'Overall effectiveness score');
    //console.log(JSON.stringify(csv_data));
});

// Tax admin barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.tax_administration,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#tax_bar", csv_data, 'Tax administration score');
    //console.log(JSON.stringify(csv_data));
});

// Inclusiveness barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.inclusiveness,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#inclusive_bar", csv_data, 'Inclusiveness score');
    //console.log(JSON.stringify(csv_data));
});

// Capabilities barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.capabilities,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#capability_bar", csv_data, 'Capabilities score');
    //console.log(JSON.stringify(csv_data));
});

// Openness barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.openness,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#open_bar", csv_data, 'Openness score');
    //console.log(JSON.stringify(csv_data));
});

// Integrity barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.integrity,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#integrity_bar", csv_data, 'Integrity score');
    //console.log(JSON.stringify(csv_data));
});

// HR management barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.human_resource_management,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#hrm_bar", csv_data, 'HR management score');
    //console.log(JSON.stringify(csv_data));
});

// Crisis barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.crisis_management,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#crisis_bar", csv_data, 'Crisis / risk management score');
    //console.log(JSON.stringify(csv_data));
});

// Regulation barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.regulation,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#regulation_bar", csv_data, 'Regulation score');
});


// Fiscal barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.fiscal_and_financial_management,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#ffm_bar", csv_data, 'Fiscal and financial management score');
});

// Digital barchart
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.digital_services,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#digital_bar", csv_data, 'Digital services score');
});

// Subsection: Social security administration
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.administration_efficiency
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#ssa_radar", csv_data, 'Social security administration score');
});

//// Social security administration
//d3.csv(datafile, function(d) {
//    return {
//        Country: d.country,
//        Overall: +d.social_security_administration,
//    }
//
//}, function(error, rows) {
//    var csv_data = rows;
//    BarChart.draw("#ssa_bar", csv_data, 'Social security administration score');
//});

// Policy making
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.policy_making,
    }

}, function(error, rows) {
    var csv_data = rows;
    BarChart.draw("#policy_bar", csv_data, 'Policy making score');
});

//Options for the Radar chart, other than default
var mycfg = {
    maxValue: 0.6
}

//Create 'Overall' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.composite,
        "Tax administration": +d.tax_administration,
        "Policy making": +d.policy_making,
        "Social security": +d.social_security_administration,
        "Digital services": +d.digital_services,
        "Fiscal and financial management": +d.fiscal_and_financial_management,
        "Regulation": +d.regulation,
        "Crisis management": +d.crisis_management,
        "Human resource management": +d.human_resource_management,
        Integrity: +d.integrity,
        Openness: +d.openness,
        Capabilities: +d.capabilities,
        Inclusiveness: +d.inclusiveness
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderOverallRadar(csv_data);
});

function renderOverallRadar(data) {
    RadarChart.draw('#overall_radar', data, mycfg);
};


//Create 'Tax' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.tax_administration,
        "Collection Cost": +d.cost_of_collection,
        "Tax Debt": +d.tax_debt,
        "Time To Pay Taxes: Business": +d.business_time_to_pay_taxes,
        "E-filed Tax Returns: Personal": +d.efiled_personal,
        "E-filed Tax Returns: Corporate": +d.efiled_corporate,
        "E-filed Tax Returns: VAT": +d.efiled_vat
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderTaxRadar(csv_data);
});

function renderTaxRadar(data) {
    RadarChart.draw('#tax_radar', data, mycfg);
};

//Create 'Inclusiveness' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.inclusiveness,
        "Gender: Central Government Share": +d.central_government_employment_share,
        "Gender: Public Sector Share": +d.public_sector_employment_share,
        "Gender: Management Share": +d.central_government_management_employment_share,
        "Gender: Senior Management Share": +d.senior_central_government_employment_share,
        "Ethnic and Religious Group Representation": +d.ethnic_and_religious_representation
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderInclusiveRadar(csv_data);
});

function renderInclusiveRadar(data) {
    RadarChart.draw('#inclusive_radar', data, mycfg);
};

//Create 'Capabilities' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.inclusiveness,
"Literacy Skills ": +d.literacy_skills,
"Numeracy Skills": +d.numeracy_skills,
"Problem Solving Skills": +d.problem_solving_skills,
"Education Attainment": +d.tertiary_education
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderCapabilityRadar(csv_data);
});

function renderCapabilityRadar(data) {
    RadarChart.draw('#capability_radar', data, mycfg);
};

//Create 'Openness' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.inclusiveness,
       "Civic Participation ": +d.civic_participation,
"E-Government Engagement": +d.egovernment_engagement,
"Negotiating Public Support": +d.negotiating_public_support,
"Complaint Mechanisms": +d.complaint_mechanisms,
"Open Data Practice and Impact": +d.open_data_practice_and_impact,
"Government Datasets Openness": +d.government_datasets_openness,
"Data Availability and Government Support": +d.data_availability_and_government_support,
"Rights to Information": +d.rights_to_information,
"Publicised Laws": +d.publicised_laws
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderOpennessRadar(csv_data);
});

function renderOpennessRadar(data) {
    RadarChart.draw('#open_radar', data, mycfg);
};

//Create 'Integrity' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.integrity,
"Corruption Perceptions": +d.corruption_perceptions,
"Public Officials Stealing": +d.public_officials_stealing,
"Public Officials Favours for Bribes": +d.public_officials_favours_for_bribes,
"Government Favouritism of Business": +d.government_favouritism_business_opinion,
"Fair Treatment by Public Officials": +d.public_officials_fair_treatment,
"Public Officials Act Impartially ": +d.public_officials_act_impartially,
"Public Officials Follow Rules": +d.public_officials_follow_rules,
"Public Officials Strive to Help Citizens": +d.public_officials_strive_to_help,
"Public Officials Strive to Implement Policies ": +d.public_officials_strive_to_implement_policies,
"Public Officials Strive to Fulfil Ideology ": +d.public_officials_strive_to_fulfil_ideology,
"Employee Absences ": +d.employee_absences,
"Employee Efficiency ": +d.employee_efficiency,
"Post Employment Cooling Off": +d.postemployment_cooling_off,
"Lobbyist Protection": +d.lobbyist_protection,
"Whistleblower Protection Coverage": +d.whistleblower_protection_coverage,
"Whistleblower Protection Degree": +d.whistleblower_protection_degree
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderIntegrityRadar(csv_data);
});

function renderIntegrityRadar(data) {
    RadarChart.draw('#integrity_radar', data, mycfg);
};

//Create 'HRM' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.integrity,
"Applicant Skills": +d.applicant_skills,
"Connections Bias in Recruitment: Political": +d.political_connections,
"Connections Bias in Recruitment: Personal": +d.personal_connections,
"Recruitment via Formal Exam System": +d.recruitment_via_formal_exam_system,
"Comparable Salaries ": +d.comparable_salaries
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderHRMRadar(csv_data);
});

function renderHRMRadar(data) {
    RadarChart.draw('#hrm_radar', data, mycfg);
};

//Create 'Crisis / Risk management' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.crisis_management,
"Risk Planning Extent ": +d.risk_planning_extent,
"Disaster Spending Appraisal": +d.disaster_spending_appraisal,
"Risk Assessment Quality": +d.risk_assessment_quality,
"Degree of Risk Monitoring": +d.degree_of_risk_monitoring,
"Early Warning Systems": +d.early_warning_systems,
"Public Information": +d.public_information,
"Public Awareness Strategy ": +d.public_awareness_strategy,
"International Cooperation ": +d.international_cooperation,
"Post Disaster Assessment": +d.post_disaster_assessment
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderCrisisRadar(csv_data);
});

function renderCrisisRadar(data) {
    RadarChart.draw('#crisis_radar', data, mycfg);
};

//Create 'Regulation' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.regulation,
"Impact Assessment: Primary Laws ": +d.impact_assessment_primary_laws,
"Impact Assessment: Secondary Laws ": +d.impact_assessment_secondary_laws,
"Stakeholder Engagement: Primary Laws ": +d.stakeholder_engagement_primary_laws,
"Stakeholder Engagement: Secondary Laws ": +d.stakeholder_engagement_secondary_laws,
"Evaluation: Primary Laws ": +d.evaluation_primary_laws,
"Evaluation: Secondary Laws ": +d.evaluation_secondary_laws
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderRegulationRadar(csv_data);
});

function renderRegulationRadar(data) {
    RadarChart.draw('#regulation_radar', data, mycfg);
};

// Create 'Fiscal and financial management' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.fiscal_and_financial_management,
"Public Spending ": +d.public_spending,
"Medium-Term Budgeting ": +d.mediumterm_budgeting,
"Performance Budgeting ": +d.performance_budgeting
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderFFMRadar(csv_data);
});

function renderFFMRadar(data) {
    RadarChart.draw('#ffm_radar', data, mycfg);
};

// Create 'Digital' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
"User Centricity ": +d.user_centricity,
"Transparency": +d.transparency,
"Cross Border Mobility": +d.mobility,
"Key Enablers ": +d.key_enablers
    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderDigitalRadar(csv_data);
});

function renderDigitalRadar(data) {
    RadarChart.draw('#digital_radar', data, mycfg);
};

// Create 'Policy making' radar
d3.csv(datafile, function(d) {
    return {
        Country: d.country,
        Overall: +d.regulation,
        "Scholarly Advice ": +d.scholarly_advice,
"Government Office Expertise": +d.government_office_expertise,
"Strategic Planning ": +d.strategic_planning,
"Ministerial Bureaucracy": +d.ministerial_bureaucracy,
"Line Ministries": +d.line_ministries,
"Monitoring Ministries": +d.monitoring_ministries,
"Monitoring Agencies": +d.monitoring_agencies,
"National Standards": +d.national_standards

    };

}, function(error, rows) {
    var csv_data = rows
        .map(function(row) {
            var country = row['Country'];
            delete row['Country'];
            delete row['Overall'];
            return Object.keys(row)
                .map(function(k) {
                    return {
                        axis: k,
                        value: row[k],
                        name: country
                    }
                })
        });
    renderPolicyRadar(csv_data);
});

function renderPolicyRadar(data) {
    RadarChart.draw('#policy_radar', data, mycfg);
};